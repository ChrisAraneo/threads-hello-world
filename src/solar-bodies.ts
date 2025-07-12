const AU = 149597870.7;
const EARTH_MASS = 5.972e24;

// Position in km
// Velocity in km/s
// Radius in km
// Mass in kg

export const SOLAR_BODIES = [
  {
    name: 'Sun',
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    radius: 696340,
    mass: 333000 * EARTH_MASS,
    trail: [],
    isFixed: true,
  },
  {
    name: 'Mercury',
    position: { x: 0.39 * AU, y: 0 },
    velocity: { x: 0, y: 47.4 },
    radius: 2439.7,
    mass: 0.055 * EARTH_MASS,
    trail: [],
    isFixed: false,
  },
  {
    name: 'Venus',
    position: { x: 0.72 * AU, y: 0 },
    velocity: { x: 0, y: 35.0 },
    radius: 6051.8,
    mass: 0.815 * EARTH_MASS,
    trail: [],
    isFixed: false,
  },
  {
    name: 'Earth',
    position: { x: 1.0 * AU, y: 0 },
    velocity: { x: 0, y: 29.8 },
    radius: 6371,
    mass: EARTH_MASS,
    trail: [],
    isFixed: false,
  },
  {
    name: 'Mars',
    position: { x: 1.52 * AU, y: 0 },
    velocity: { x: 0, y: 24.1 },
    radius: 3389.5,
    mass: 0.107 * EARTH_MASS,
    trail: [],
    isFixed: false,
  },
  {
    name: 'Jupiter',
    position: { x: 5.2 * AU, y: 0 },
    velocity: { x: 0, y: 13.1 },
    radius: 69911,
    mass: 317.8 * EARTH_MASS,
    trail: [],
    isFixed: false,
  },
  {
    name: 'Saturn',
    position: { x: 9.5 * AU, y: 0 },
    velocity: { x: 0, y: 9.7 },
    radius: 58232,
    mass: 95.2 * EARTH_MASS,
    trail: [],
    isFixed: false,
  },
];
