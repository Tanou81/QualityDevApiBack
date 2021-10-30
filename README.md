# QualiteDev API

REST API using express and MongoDB

# Summary

- [Start project](#init)
- [Starting development](#dev)
- [Starting production](#prod)
- [List of queries](#queries)

## Start project <a id="init"/>

Start by installing every node modules

```sh
$ npm i
# Or
$ npm install
```

Create a .env file

```sh
MONGO_URI= # mongo database URL
# It should look like :
# mongodb+srv://<user>:<password>@<datalake>.fkfmr.mongodb.net/<database>?retryWrites=true&w=majority
PORT= # 3000
```

## Starting developpment <a id="dev"/>

```sh
$ npm run dev
# Runs nodemon express server
```

## Starting for production <a id="prod"/>

```sh
$ npm start
# Runs node express server
```

## List of queries <a id="queries"/>

### User queries

**Create Student user**

#### `PATH_TO_API/api/user/createstudent`

- email
- name
- firstname
  <br/>

**Create Teacher user**

#### `PATH_TO_API/api/user/createteacher`

- email
- name
- firstname
  <br/>

**Delete a user**

#### `PATH_TO_API/api/user/delete`

- email
  <br/>

**Get every existing students**

#### `PATH_TO_API/api/user/getallstudents`

- NO PARAMETERS
  <br/>

**Get student corresponding to email**

#### `PATH_TO_API/api/user/getstudentbyemail`

- email
  <br/>

**Get every existing teachers**

#### `PATH_TO_API/api/user/getallteachers`

- NO PARAMETERS
  <br/>

**Get teacher corresponding to email**

#### `PATH_TO_API/api/user/getteacherbyemail`

- email
  <br/>

### Group queries

**Create a group**

#### `PATH_TO_API/api/group/create`

- manager -> teacher_id
- students -> [student_id, ...]
  <br/>

**Get all groups**

#### `PATH_TO_API/api/group/getallgroups`

- NO PARAMETERS
  <br/>

**Get group by group id**

#### `PATH_TO_API/api/group/getgroup`

- groupId
  <br/>

**Add criteria to group**

> Requirements : no sprint started

#### `PATH_TO_API/api/group/addlabel`

- groupId
- label -> String
  <br/>

**Remove criteria from group**

> Requirements : no sprint started

#### `PATH_TO_API/api/group/removelabel`

- groupId
- label -> String
  <br/>

### Group queries

**Create a sprint**

> Requirements : group must exist

#### `PATH_TO_API/api/srpint/create`

- groupId
  <br/>

**Delete a sprint**

#### `PATH_TO_API/api/srpint/delete`

- groupId
- sprintId
  <br/>

**Update sprint ratings**

<style>o{color:red;}</style><o>Requirements : labels must exist</o>

#### `PATH_TO_API/api/srpint/updateratings`

- sprintId
- ratings -> {"label": rating}

```json
// Example :
{
  "TASKS": 4.5,
  "RELEASES": 2,
  "ANOTHER_EXISTING_LABEL": 4
}
```

  <br/>

**Update sprint comment**

#### `PATH_TO_API/api/srpint/updatecomment`

- sprintId
- comment

  <br/>
