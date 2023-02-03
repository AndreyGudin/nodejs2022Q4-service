export class Fav {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(partial: Partial<Fav>) {
    Object.assign(this, partial);
  }
}
