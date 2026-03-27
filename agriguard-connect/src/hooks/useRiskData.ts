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
          drought: f.drought?.probability ?? merged.drought,
          flood: f.flood?.probability ?? merged.flood,
          heat: f.heat_wave?.probability ?? merged.heat,
          droughtLevel: f.drought?.risk_level ?? merged.droughtLevel,
          floodLevel: f.flood?.risk_level ?? merged.floodLevel,
          heatLevel: f.heat_wave?.risk_level ?? merged.heatLevel,
          primaryCrop: f.recommendations?.primary_crop ?? merged.primaryCrop,
          avoidCrops: f.recommendations?.crops_to_avoid ?? merged.avoidCrops,
          advisory: f.recommendations?.advisory ?? merged.advisory,
        };
      }

      if (insurance.status === 'fulfilled' && insurance.value) {
        const ins = insurance.value;
        anyLive = true;
        merged = {
          ...merged,
          insuranceTrigger: ins.trigger_status ?? merged.insuranceTrigger,
          soilMoisture: ins.soil_moisture ?? merged.soilMoisture,
          ndvi: ins.ndvi ?? merged.ndvi,
        };
      }

      if (credit.status === 'fulfilled' && credit.value) {
        const cr = credit.value;
        anyLive = true;
        merged = {
          ...merged,
          kccRisk: cr.risk_flag ?? merged.kccRisk,
          kccReduction: cr.recommended_kcc_reduction ?? merged.kccReduction,
          stressBuffer: cr.climate_stress_buffer ?? merged.stressBuffer,
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
