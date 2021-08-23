# Nested Rules to add comments

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if request.time < timestamp.date(2021, 8, 30);
      allow create, update: if request.auth.uid != null && request.resource.data.title != '';
      allow delete: if request.auth.uid == resource.data.user.uid;
//       for reading writing comments - we will write a nested rule
      match /comments/{commentId} {
        allow read: if request.time < timestamp.date(2021, 8, 30);
        allow create, update: if request.auth.uid != null;
      }
    }
//     for adding users
    match /users/{userId}{
      allow read;
      allow write: if request.auth.uid == userId;
    }
  }
}

```
