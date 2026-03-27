import { useEffect, useRef, useState } from 'react';
import { DistrictData } from '@/lib/types';
import { DISTRICTS_DATA } from '@/lib/data';
import { getForecast, getInsuranceTrigger, getCreditRisk, getForecastHorizon } from '@/lib/api';

interface RiskResult {
  data: DistrictData;
  isLoading: boolean;
  isLive: boolean;
}

export function useRiskData(district: string): RiskResult {
  const fallback = DISTRICTS_DATA[district] || DISTRICTS_DATA['Solapur'];
  const [data, setData] = useState<DistrictData>(fallback);
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const cache = useRef<Record<string, DistrictData>>({});

  useEffect(() => {
    if (cache.current[district]) {
      setData(cache.current[district]);
      setIsLive(true);
      return;
    }

    setData(fallback);
    setIsLoading(true);

    Promise.allSettled([
      getForecast(district),
      getInsuranceTrigger(district),
      getCreditRisk(district),
      getForecastHorizon(district),
    ]).then(([forecast, insurance, credit, horizon]) => {
      let merged = { ...fallback };
      let anyLive = false;

      if (forecast.status === 'fulfilled' && forecast.value) {
        const f = forecast.value;
        anyLive = true;
        merged = {
          ...merged,
          drought: (f.drought_score !== undefined) ? f.drought_score * 100 : (f.drought?.probability ?? merged.drought),
          flood: (f.flood_score !== undefined) ? f.flood_score * 100 : (f.flood?.probability ?? merged.flood),
          heat: (f.heat_wave_score !== undefined) ? f.heat_wave_score * 100 : (f.heat_wave?.probability ?? merged.heat),
          droughtLevel: (f.drought_score > 0.7) ? 'HIGH' : (f.drought_score > 0.4 ? 'MEDIUM' : 'LOW'),
          floodLevel: (f.flood_score > 0.6) ? 'HIGH' : (f.flood_score > 0.3 ? 'MEDIUM' : 'LOW'),
          heatLevel: (f.heat_wave_score > 0.75) ? 'HIGH' : (f.heat_wave_score > 0.5 ? 'MEDIUM' : 'LOW'),
          primaryCrop: f.recommendations?.primary_crop ?? merged.primaryCrop,
          avoidCrops: f.recommendations?.crops_to_avoid ?? merged.avoidCrops,
          advisory: f.crop_advisory ?? (f.recommendations?.advisory ?? merged.advisory),
        };
      }

      if (insurance.status === 'fulfilled' && insurance.value) {
        const ins = insurance.value;
        anyLive = true;
        merged = {
          ...merged,
          insuranceTrigger: ins.trigger ? 'ARMED' : (ins.trigger_status ?? merged.insuranceTrigger),
          soilMoisture: (ins.drought_score !== undefined) ? (1 - ins.drought_score) * 40 : (ins.soil_moisture ?? merged.soilMoisture),
          ndvi: (ins.ndvi !== undefined) ? ins.ndvi : (ins.ndvi ?? merged.ndvi),
        };
      }

      if (credit.status === 'fulfilled' && credit.value) {
        const cr = credit.value;
        anyLive = true;
        merged = {
          ...merged,
          kccRisk: cr.risk_level ?? (cr.risk_flag ?? merged.kccRisk),
          kccReduction: (cr.max_hazard_score > 0.7) ? 25 : (cr.kccReduction ?? merged.kccReduction),
          stressBuffer: (cr.max_hazard_score !== undefined) ? cr.max_hazard_score * 15 : (cr.climate_stress_buffer ?? merged.stressBuffer),
        };
      }

      if (horizon.status === 'fulfilled' && horizon.value) {
        anyLive = true;
      }

      cache.current[district] = merged;
      setData(merged);
      setIsLive(anyLive);
      setIsLoading(false);
    });
  }, [district]);

  return { data, isLoading, isLive };
}
