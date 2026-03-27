import { DistrictData } from './types';

export const YEARS = [2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039];
export const MH_AVERAGE = [38,39,40,41,42,43,43,44,45,46,46,47,47,48,48];

export const DISTRICTS_DATA: Record<string, DistrictData> = {
  Solapur: {
    drought:78, flood:18, heat:65, droughtLevel:'HIGH', floodLevel:'LOW', heatLevel:'HIGH',
    primaryCrop:'Bajra / Jowar', avoidCrops:['Sugarcane','Rice'],
    advisory:'Switch from water-intensive crops before June sowing season.',
    insuranceTrigger:'ARMED', soilMoisture:18.4, ndvi:0.28, soc:0.42, cropFire:72, landUse:62, vulnIndex:0.78,
    kccRisk:'HIGH', kccReduction:30, stressBuffer:15,
    pop:'43.4L', agri:'8.4L ha', rain:'540mm', crops:'Bajra, Jowar',
    seedDemand:{ bajra:42000, jowar:31000, cotton:18000, turDal:14000, chickpea:9000 },
    trend:[55,58,61,65,68,70,72,74,75,77,78,79,80,80,80],
    floodTrend:[16,16,17,17,18,18,18,18,18,18,18,18,18,18,18],
    heatTrend:[60,61,62,63,64,64,65,65,65,65,65,65,65,65,65],
  },
  Ahmednagar: {
    drought:65, flood:28, heat:58, droughtLevel:'HIGH', floodLevel:'LOW', heatLevel:'MEDIUM',
    primaryCrop:'Soybean / Tur Dal', avoidCrops:['Sugarcane'],
    advisory:'Shift to short-duration pulses — rainfall variability increasing.',
    insuranceTrigger:'MONITOR', soilMoisture:22.1, ndvi:0.36, soc:0.55, cropFire:48, landUse:68, vulnIndex:0.65,
    kccRisk:'HIGH', kccReduction:25, stressBuffer:12,
    pop:'51.6L', agri:'9.2L ha', rain:'580mm', crops:'Soybean, Tur Dal',
    seedDemand:{ bajra:28000, jowar:22000, cotton:35000, turDal:20000, chickpea:12000 },
    trend:[48,51,53,56,58,60,61,62,63,64,65,65,66,66,67],
    floodTrend:[24,25,25,26,27,27,28,28,28,28,28,28,28,29,29],
    heatTrend:[52,53,54,55,56,57,57,58,58,58,58,58,58,58,58],
  },
  Aurangabad: {
    drought:60, flood:32, heat:55, droughtLevel:'HIGH', floodLevel:'MEDIUM', heatLevel:'MEDIUM',
    primaryCrop:'Cotton / Maize', avoidCrops:['Rice'],
    advisory:'Cotton viable but monitor for extended dry spells in July.',
    insuranceTrigger:'MONITOR', soilMoisture:20.8, ndvi:0.38, soc:0.49, cropFire:45, landUse:65, vulnIndex:0.60,
    kccRisk:'MEDIUM', kccReduction:20, stressBuffer:10,
    pop:'38.9L', agri:'7.3L ha', rain:'610mm', crops:'Cotton, Maize',
    seedDemand:{ bajra:20000, jowar:18000, cotton:42000, turDal:16000, chickpea:10000 },
    trend:[44,47,49,52,54,56,57,58,59,60,60,61,61,62,62],
    floodTrend:[28,28,29,30,31,31,32,32,32,32,32,32,32,33,33],
    heatTrend:[48,49,50,51,52,53,54,54,55,55,55,55,55,55,55],
  },
  Nashik: {
    drought:45, flood:38, heat:42, droughtLevel:'MEDIUM', floodLevel:'MEDIUM', heatLevel:'MEDIUM',
    primaryCrop:'Onion / Grapes', avoidCrops:['Paddy'],
    advisory:'Moderate risk — drip irrigation recommended for horticulture.',
    insuranceTrigger:'NORMAL', soilMoisture:28.6, ndvi:0.46, soc:0.68, cropFire:22, landUse:55, vulnIndex:0.45,
    kccRisk:'MEDIUM', kccReduction:12, stressBuffer:8,
    pop:'61.1L', agri:'6.8L ha', rain:'640mm', crops:'Onion, Grapes',
    seedDemand:{ bajra:14000, jowar:12000, cotton:20000, turDal:18000, chickpea:15000 },
    trend:[35,37,38,40,41,42,43,44,44,45,45,46,46,47,47],
    floodTrend:[33,34,35,36,37,37,38,38,38,38,38,38,39,39,39],
    heatTrend:[38,39,39,40,41,41,42,42,42,42,42,42,42,42,42],
  },
  Pune: {
    drought:32, flood:48, heat:38, droughtLevel:'LOW', floodLevel:'MEDIUM', heatLevel:'MEDIUM',
    primaryCrop:'Sugarcane / Wheat', avoidCrops:[],
    advisory:'Low drought risk. Monitor flood zones near river catchments.',
    insuranceTrigger:'NORMAL', soilMoisture:34.2, ndvi:0.54, soc:0.81, cropFire:18, landUse:48, vulnIndex:0.32,
    kccRisk:'LOW', kccReduction:5, stressBuffer:5,
    pop:'96.2L', agri:'5.1L ha', rain:'720mm', crops:'Sugarcane, Wheat',
    seedDemand:{ bajra:8000, jowar:6000, cotton:12000, turDal:10000, chickpea:8000 },
    trend:[28,28,29,29,30,30,30,31,31,31,32,32,32,33,33],
    floodTrend:[42,43,44,45,46,47,47,48,48,48,48,48,48,48,48],
    heatTrend:[34,35,35,36,37,37,38,38,38,38,38,38,38,38,38],
  },
  Kolhapur: {
    drought:22, flood:68, heat:25, droughtLevel:'LOW', floodLevel:'HIGH', heatLevel:'LOW',
    primaryCrop:'Sugarcane / Rice', avoidCrops:[],
    advisory:'Low drought risk. High flood exposure near Panchganga basin.',
    insuranceTrigger:'FLOOD_WATCH', soilMoisture:52.3, ndvi:0.68, soc:0.93, cropFire:8, landUse:41, vulnIndex:0.22,
    kccRisk:'LOW', kccReduction:5, stressBuffer:5,
    pop:'38.6L', agri:'4.2L ha', rain:'1820mm', crops:'Sugarcane, Rice',
    seedDemand:{ bajra:4000, jowar:3000, cotton:6000, turDal:8000, chickpea:5000 },
    trend:[20,20,21,21,21,22,22,22,22,22,22,23,23,23,23],
    floodTrend:[60,62,63,64,65,66,67,67,68,68,68,68,68,68,68],
    heatTrend:[22,22,23,23,24,24,25,25,25,25,25,25,25,25,25],
  },
  Beed: {
    drought:72, flood:22, heat:62, droughtLevel:'HIGH', floodLevel:'LOW', heatLevel:'HIGH',
    primaryCrop:'Cotton / Bajra', avoidCrops:['Sugarcane','Rice'],
    advisory:'Critical drought zone — prioritize drought-tolerant cotton varieties.',
    insuranceTrigger:'ARMED', soilMoisture:17.2, ndvi:0.26, soc:0.44, cropFire:68, landUse:64, vulnIndex:0.72,
    kccRisk:'HIGH', kccReduction:28, stressBuffer:14,
    pop:'25.9L', agri:'7.1L ha', rain:'520mm', crops:'Cotton, Bajra',
    seedDemand:{ bajra:38000, jowar:28000, cotton:25000, turDal:12000, chickpea:8000 },
    trend:[52,55,58,62,65,67,69,70,71,72,72,73,73,74,74],
    floodTrend:[18,19,20,20,21,21,22,22,22,22,22,22,22,22,22],
    heatTrend:[56,57,58,59,60,61,61,62,62,62,62,62,62,62,62],
  },
  Osmanabad: {
    drought:69, flood:25, heat:60, droughtLevel:'HIGH', floodLevel:'LOW', heatLevel:'HIGH',
    primaryCrop:'Jowar / Tur Dal', avoidCrops:['Sugarcane'],
    advisory:'Marathwada drought core — Jowar and Tur Dal strongly recommended.',
    insuranceTrigger:'ARMED', soilMoisture:17.8, ndvi:0.29, soc:0.46, cropFire:65, landUse:65, vulnIndex:0.69,
    kccRisk:'HIGH', kccReduction:26, stressBuffer:13,
    pop:'16.5L', agri:'5.8L ha', rain:'510mm', crops:'Jowar, Tur Dal',
    seedDemand:{ bajra:32000, jowar:36000, cotton:14000, turDal:22000, chickpea:10000 },
    trend:[50,53,56,60,62,64,66,67,68,69,69,70,70,71,71],
    floodTrend:[20,21,22,23,24,24,25,25,25,25,25,25,25,25,25],
    heatTrend:[54,55,56,57,58,59,60,60,60,60,60,60,60,60,60],
  },
  Latur: {
    drought:66, flood:20, heat:58, droughtLevel:'HIGH', floodLevel:'LOW', heatLevel:'MEDIUM',
    primaryCrop:'Tur Dal / Soybean', avoidCrops:['Sugarcane'],
    advisory:'High drought risk — short-duration pulses strongly recommended.',
    insuranceTrigger:'ARMED', soilMoisture:18.9, ndvi:0.31, soc:0.48, cropFire:62, landUse:63, vulnIndex:0.66,
    kccRisk:'HIGH', kccReduction:24, stressBuffer:12,
    pop:'24.8L', agri:'6.2L ha', rain:'530mm', crops:'Tur Dal, Soybean',
    seedDemand:{ bajra:30000, jowar:26000, cotton:16000, turDal:28000, chickpea:14000 },
    trend:[48,51,54,57,60,62,63,64,65,66,66,67,67,68,68],
    floodTrend:[16,17,18,18,19,19,20,20,20,20,20,20,20,20,20],
    heatTrend:[52,53,54,55,56,57,57,58,58,58,58,58,58,58,58],
  },
  Nanded: {
    drought:58, flood:30, heat:52, droughtLevel:'MEDIUM', floodLevel:'MEDIUM', heatLevel:'MEDIUM',
    primaryCrop:'Cotton / Jowar', avoidCrops:['Rice'],
    advisory:'Medium risk — diversify between cotton and jowar for resilience.',
    insuranceTrigger:'MONITOR', soilMoisture:23.4, ndvi:0.38, soc:0.56, cropFire:42, landUse:60, vulnIndex:0.58,
    kccRisk:'MEDIUM', kccReduction:18, stressBuffer:9,
    pop:'33.6L', agri:'7.8L ha', rain:'840mm', crops:'Cotton, Jowar',
    seedDemand:{ bajra:22000, jowar:24000, cotton:30000, turDal:18000, chickpea:12000 },
    trend:[42,44,46,48,50,52,53,54,55,56,57,57,58,58,58],
    floodTrend:[25,26,27,27,28,29,29,30,30,30,30,30,30,30,30],
    heatTrend:[46,47,48,49,50,51,51,52,52,52,52,52,52,52,52],
  },
};

export const DISTRICT_NAMES = Object.keys(DISTRICTS_DATA);

export function getRiskColor(level: string): string {
  if (level === 'HIGH') return '#dc2626';
  if (level === 'MEDIUM') return '#d97706';
  return '#059669';
}

export function getRiskBg(level: string): string {
  if (level === 'HIGH') return '#fef2f2';
  if (level === 'MEDIUM') return '#fffbeb';
  return '#ecfdf5';
}

export function getRiskBorder(level: string): string {
  if (level === 'HIGH') return '#fecaca';
  if (level === 'MEDIUM') return '#fde68a';
  return '#a7f3d0';
}
