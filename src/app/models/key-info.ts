export interface Info {
    not_mentioned: number;
    mentioned: number;
    total: number;
}
export interface DeviceInfo extends Info {
    device_type: string;
}

export interface CountryInfo extends Info {
    country: string;
}

export interface DistributionInfo {
    country: string;
    smart_watches: number | null;
    smart_tvs: number | null;
    smart_thermostats: number | null;
    smart_speakers: number | null;
    smart_sensors: number | null;
    smart_security: number | null;
    smart_scales: number | null,
    smart_projectors: number | null;
    smart_networking: number | null;
    smart_mounts: number | null;
    smart_monitors: number | null;
    smart_locks: number | null;
    smart_location_trackers: number | null;
    smart_lights: number | null;
    smart_home_devices: number | null;
    smart_health_trackers: number | null;
    smart_gaming: number | null;
    smart_fitness_equipments: number | null;
    smart_entertainment_devices: number | null;
    smart_doorbells: number | null;
    smart_connected_vehicle: number | null;
    smart_cameras: number | null;
    smart_body_scanners: number | null;
    misc: number | null;
}


