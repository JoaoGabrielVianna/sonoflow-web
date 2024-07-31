export interface ProgressControlType {
  layer: number;
  progressPercentage: number;
  maxLayer: number;
  handleLayer: (direction: 'GOBACK' | 'CONTINUE') => void;
}