export interface WoundListDetail {
  id: number;
  type: string | null;
  location: string | null;
  orientation: string | null;
  direction: string | null;
  evaluationDate: string | null;
  length: number | null;
  width: number | null;
  depth: number | null;
  therapyResumptionDate: string | null;
  therapyHoldDate: string | null;
}
export interface WoundDetails {
  wounds: WoundListDetail[];
}
