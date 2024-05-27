export const jobShumbnail = (job: string): string | null => {
  const mapping: { [key: string]: string } = {
    버서커: "berserker_m",
    디스트로이어: "destroyer_m",
    워로드: "warlord_m",
    홀리나이트: "holyknight_m",
    슬레이어: "berserker_female",
    배틀마스터: "battle_master_m",
    인파이터: "infighter_m",
    기공사: "force_master_m",
    창술사: "lance_master_m",
    스트라이커: "battle_master_male_m",
    브레이커: "infighter_male",
    데빌헌터: "devil_hunter_m",
    블레스터: "blaster_m",
    호크아이: "hawk_eye_m",
    스카우터: "scouter_m",
    건슬링어: "devil_hunter_female_m",
    아르카나: "arcana_m",
    서머너: "summoner_m",
    바드: "bard_m",
    소서리스: "elemental_master_m",
    데모닉: "demonic_m",
    블레이드: "blade_m",
    리퍼: "reaper_m",
    소울이터: "soul_eater",
    도화가: "yinyangshi_m",
    기상술사: "weather_artist_m",
  };

  return mapping[job] || null;
};
