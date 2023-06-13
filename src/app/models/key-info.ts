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
    smart_watch: number | null;
    smart_tv: number | null;
    smart_thermostat: number | null;
    smart_thermometer: number | null;
    smart_speaker: number | null;
    smart_sensor: number | null;
    smart_security: number | null;
    smart_scale: number | null;
    smart_projector: number | null;
    smart_networking: number | null;
    smart_mount: number | null;
    smart_monitor: number | null;
    smart_lock: number | null;
    smart_location_tracker: number | null;
    smart_light: number | null;
    smart_home_device: number | null;
    smart_health_tracker: number | null;
    smart_gaming: number | null;
    smart_fitness_equipment: number | null;
    smart_entertainment_device: number | null;
    smart_doorbell: number | null;
    smart_connected_vehicle: number | null;
    smart_camera: number | null;
    smart_body_scanner: number | null;
    smart_bracelet: number | null;
    smart_air_purifier: number | null;
    smart_air_conditioner: number | null;
    smart_alarm_clock: number | null;
    misc: number | null;
}

export interface UpdateData {
    device_name: string;
    year: number;
}

export interface OutputData {
    device_name: string;
    data: {
        year: number;
        count: number;
    }[];
}

export const devices = [
    'Smart Home Device',
    'Miscellaneous',
    'Smart Air Conditioner',
    'Smart Alarm Clock',
    'Smart Body Scanner',
    'Smart Bracelet',
    'Smart Camera',
    'Smart Connected Vehicle',
    'Smart Doorbell',
    'Smart Entertainment Devices',
    'Smart Fitness Equipment',
    'Smart Health Tracker',
    'Smart Light',
    'Smart Location Tracker',
    'Smart Lock',
    'Smart Monitor',
    'Smart Networking',
    'Smart Scale',
    'Smart Security',
    'Smart Sensor',
    'Smart Speaker',
    'Smart Thermometer',
    'Smart Thermostat',
    'Smart Watch',
];
