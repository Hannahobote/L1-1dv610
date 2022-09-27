## OBS applikationen ligger i v2!
## Connect to the module and put your mongo databse connection string as parameter. This is the start of the application.
  `const auth = new SimpleAuth(process.env.DB_CONNECTION_STRING)`

## Register a user
  `await auth.register('hannah6', 'password')`

## Sign in a user
`await auth.signIn('hannah3', 'password')`

## Get current user
`await auth.getCurrentSignedInUser()`

## Sign out user
`await auth.signOut()`

## Get all users
`await auth.getAllUsers()`