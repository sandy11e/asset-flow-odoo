export const mockResourceAvailability = [
  {
    id: 'RES-MR-101',
    name: 'Executive Conference Room A',
    type: 'Meeting Room',
    capacity: '24 people',
    location: 'HQ Floor 4 — Room 402',
    isAvailable: true,
    nextAvailableSlot: 'Today at 13:00',
    bookedSlots: [
      { start: '2026-07-15T09:00:00.000Z', end: '2026-07-15T12:00:00.000Z', title: 'Q3 Strategic Review' },
    ],
  },
  {
    id: 'RES-VH-204',
    name: 'Ford Transit Van (AF-VAN-04)',
    type: 'Vehicle',
    capacity: '1,500 kg Payload',
    location: 'West Depot Logistics Hub',
    isAvailable: false,
    nextAvailableSlot: 'July 18 at 08:00',
    bookedSlots: [
      { start: '2026-07-16T08:00:00.000Z', end: '2026-07-17T18:00:00.000Z', title: 'Field Engineering Audit' },
    ],
  },
  {
    id: 'RES-EQ-309',
    name: 'DJI Matrice 300 RTK Industrial Drone',
    type: 'Equipment',
    capacity: '55 min Flight Time',
    location: 'Geospatial Engineering Lockers',
    isAvailable: true,
    nextAvailableSlot: 'Available Now',
    bookedSlots: [
      { start: '2026-07-18T10:00:00.000Z', end: '2026-07-18T16:00:00.000Z', title: 'Wind Farm Mapping' },
    ],
  },
  {
    id: 'RES-LAB-501',
    name: 'Robotics & Automation Cleanroom Lab',
    type: 'Lab',
    capacity: '8 Researchers',
    location: 'Innovation Campus — Building C',
    isAvailable: true,
    nextAvailableSlot: 'July 19 at 08:00',
    bookedSlots: [
      { start: '2026-07-19T13:00:00.000Z', end: '2026-07-19T17:30:00.000Z', title: 'Prototype Calibration' },
    ],
  },
  {
    id: 'RES-WS-402',
    name: 'Innovation Hub Pod B (12 Seats)',
    type: 'Workspace',
    capacity: '12 Desks + Whiteboard Wall',
    location: 'HQ Floor 3 — Collaborative Zone',
    isAvailable: true,
    nextAvailableSlot: 'Available Now',
    bookedSlots: [
      { start: '2026-07-20T09:00:00.000Z', end: '2026-07-24T17:00:00.000Z', title: 'Sprint Collab Week' },
    ],
  },
];
