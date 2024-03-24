export interface IntakeDiary {
  id: string;
  title: string;
  contents: string;
  start: Date;
  end: Date;
  user_id?: string;
}
