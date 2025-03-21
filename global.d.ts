declare namespace NodeJS {
    interface Global {
      mongoose: {
        conn: any; // You can specify a more precise type if you know it
        promise: Promise<typeof mongoose> | null;
      } | null;
    }
  }
  