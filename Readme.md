# Tracking Views Challenge

## Firestore Schema

```
  // user_views collection
  type UserViewCollection = {
    id: string;
    recordingId: string;
  }

  // users collection
  type UserDocument = {
    id: string;
    name: string;
    views: UserViewCollection;
  }

  // recording_views collection
  type RecordingViewCollection = {
    id: string;
    userId: string;
  }

  // recordings collection
  type RecordingDocument = {
    id: string;
    name: string;
    creatorId: string;
    views: RecordingViewCollection;
  }
```

## Project Setup

### Env
```
> cp .env.example .env
```
After running the above command, you should set the ```FIREBASE_FUNCTIONS_EMULATOR_HOST``` value in the .env file.

### Setup
```
> cd functions
> run install
```
### Running emulator

```
> npm run serve
```

### Running tests

We should run the firebase emulator before running tests.
```
> npm run test
```

