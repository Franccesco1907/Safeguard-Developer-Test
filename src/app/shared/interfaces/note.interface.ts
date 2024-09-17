export interface INote {
  id: number;
  title: string;
  body: string;
  size: 'small' | 'medium' | 'large';
}