import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DISTRICTS_DATA } from '@/lib/data';
import { DistrictData, Hazard } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════
   Maharashtra District Map — Real Leaflet map with district 
   polygon overlays, color-coded by hazard risk level
   ═══════════════════════════════════════════════════════════════ */

interface MahaMapProps {
  district: string;
  hazard: Hazard;
  onSelect: (d: string) => void;
}

function getHazardValue(d: DistrictData, h: Hazard) {
  return h === 'drought' ? d.drought : h === 'flood' ? d.flood : d.heat;
}
function getHazardLevel(d: DistrictData, h: Hazard) {
  return h === 'drought' ? d.droughtLevel : h === 'flood' ? d.floodLevel : d.heatLevel;
}

function riskFill(level: string): string {
  if (level === 'HIGH') return '#dc2626';
  if (level === 'MEDIUM') return '#d97706';
  return '#059669';
}

// Approximate polygon boundaries for each district (simplified)
const DISTRICT_POLYGONS: Record<string, [number, number][]> = {
  Nashik: [
    [20.35, 73.20], [20.55, 73.60], [20.45, 74.10], [20.15, 74.40],
    [19.80, 74.20], [19.75, 73.50], [20.00, 73.20],
  ],
  Ahmednagar: [
    [19.80, 74.20], [20.15, 74.40], [19.90, 75.00], [19.55, 75.30],
    [19.10, 75.10], [18.80, 74.60], [19.10, 74.20],
  ],
  Aurangabad: [
    [20.15, 74.80], [20.40, 75.20], [20.25, 75.80], [19.85, 76.00],
    [19.55, 75.60], [19.55, 75.30], [19.90, 75.00],
  ],
  Nanded: [
    [19.85, 76.00], [20.10, 76.60], [19.80, 77.50], [19.20, 77.40],
    [18.90, 77.00], [19.10, 76.40], [19.50, 76.10],
  ],
  Pune: [
    [19.10, 73.40], [19.10, 74.20], [18.80, 74.60], [18.50, 74.70],
    [18.10, 74.30], [18.00, 73.70], [18.30, 73.30], [18.70, 73.20],
  ],
  Beed: [
    [19.55, 75.30], [19.55, 75.60], [19.40, 76.10], [19.10, 76.40],
    [18.70, 76.20], [18.50, 75.80], [18.70, 75.30], [19.10, 75.10],
  ],
  Latur: [
    [18.70, 76.20], [19.10, 76.40], [18.90, 77.00], [18.50, 77.10],
    [18.10, 76.80], [18.10, 76.40], [18.40, 76.10],
  ],
  Solapur: [
    [18.10, 74.80], [18.50, 75.20], [18.70, 75.30], [18.50, 75.80],
    [18.10, 76.40], [17.60, 76.20], [17.20, 75.80], [17.40, 75.20],
    [17.60, 74.90],
  ],
  Osmanabad: [
    [18.50, 75.80], [18.70, 76.20], [18.40, 76.50], [18.10, 76.40],
    [17.80, 76.50], [17.60, 76.20], [18.10, 75.80],
  ],
  Kolhapur: [
    [17.20, 73.80], [17.40, 74.20], [17.40, 74.60], [17.20, 74.80],
    [16.80, 74.60], [16.40, 74.30], [16.50, 73.90], [16.90, 73.70],
  ],
};

// District centroids for labels
const CENTROIDS: Record<string, [number, number]> = {
  Nashik:     [20.10, 73.75],
  Ahmednagar: [19.40, 74.70],
  Aurangabad: [19.90, 75.35],
  Nanded:     [19.40, 77.00],
  Pune:       [18.55, 73.85],
  Beed:       [19.00, 75.70],
  Latur:      [18.45, 76.55],
  Solapur:    [17.85, 75.55],
  Osmanabad:  [18.15, 76.10],
  Kolhapur:   [16.90, 74.25],
};

export default function MaharashtraMap({ district, hazard, onSelect }: MahaMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [18.8, 75.3],
      zoom: 7,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
      minZoom: 6,
      maxZoom: 10,
    });

    // Clean, professional tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OSM &copy; CARTO',
    }).addTo(map);

    // Add zoom control to bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add attribution at bottom-left
    L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map);

    mapRef.current = map;
    layersRef.current = L.layerGroup().addTo(map);

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Update polygons when hazard or district changes
  useEffect(() => {
    if (!mapRef.current || !layersRef.current) return;
    layersRef.current.clearLayers();

    Object.entries(DISTRICT_POLYGONS).forEach(([name, coords]) => {
      const data = DISTRICTS_DATA[name];
      if (!data) return;

      const level = getHazardLevel(data, hazard);
      const value = getHazardValue(data, hazard);
      const color = riskFill(level);
      const isActive = name === district;

      // District polygon
      const polygon = L.polygon(coords, {
        color: isActive ? '#1a56db' : color,
        weight: isActive ? 3 : 1.5,
        fillColor: color,
        fillOpacity: isActive ? 0.45 : 0.25,
        className: 'cursor-pointer',
      });

      polygon.on('click', () => onSelect(name));

      polygon.on('mouseover', (e) => {
        if (name !== district) {
          e.target.setStyle({ fillOpacity: 0.4, weight: 2 });
        }
      });
      polygon.on('mouseout', (e) => {
        if (name !== district) {
          e.target.setStyle({ fillOpacity: 0.25, weight: 1.5 });
        }
      });

      polygon.bindTooltip(
        `<div style="font-family:Inter,sans-serif;padding:2px 0">
          <div style="font-weight:600;font-size:12px;margin-bottom:2px">${name}</div>
          <div style="font-size:11px;color:#6b7280">${hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave'}: <span style="color:${color};font-weight:600">${value}%</span> · ${level}</div>
        </div>`,
        { direction: 'top', offset: [0, -5], className: 'custom-tooltip' }
      );

      layersRef.current!.addLayer(polygon);

      // Label marker
      const centroid = CENTROIDS[name];
      if (centroid) {
        const label = L.divIcon({
          className: 'district-label',
          html: `<div style="
            font-family:Inter,sans-serif;font-size:${isActive ? '11px' : '9px'};
            font-weight:${isActive ? '700' : '500'};
            color:${isActive ? '#1a56db' : '#374151'};
            text-align:center;white-space:nowrap;
            text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff;
            pointer-events:none;
          ">
            ${name}<br/>
            <span style="font-family:'IBM Plex Mono',monospace;font-size:${isActive ? '11px' : '9px'};color:${color};font-weight:700">${value}%</span>
          </div>`,
          iconSize: [60, 30],
          iconAnchor: [30, 15],
        });
        layersRef.current!.addLayer(L.marker(centroid, { icon: label, interactive: false }));
      }
    });
  }, [district, hazard, onSelect]);

  const hazardLabel = hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave';

  return (
    <div className="bg-white border border-bdr rounded-lg overflow-hidden">
      {/* Map header */}
      <div className="px-4 py-2.5 border-b border-bdr flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-t-primary">Maharashtra — {hazardLabel} Risk Map</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-t-dim">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor:'#059669'}} /> Low</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor:'#d97706'}} /> Medium</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{backgroundColor:'#dc2626'}} /> High</span>
        </div>
      </div>

      {/* Map container */}
      <div ref={containerRef} style={{ height: 420 }} className="w-full" />

      {/* Map footer */}
      <div className="px-4 py-2 border-t border-bdr flex items-center justify-between text-[10px] text-t-dim font-mono">
        <span>Click a district to inspect · {Object.keys(DISTRICT_POLYGONS).length} districts</span>
        <span>Tiles: CartoDB · Data: DiCRA, IMD</span>
      </div>
    </div>
  );
}
