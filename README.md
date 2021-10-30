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

# User queries

**Create Student user**

#### `PATH_TO_API/api/user/createstudent`
***POST Request***

- email
- name
- firstname
  <br/>

**Create Teacher user**

#### `PATH_TO_API/api/user/createteacher`
***POST Request***

- email
- name
- firstname
  <br/>

**Delete a user**

#### `PATH_TO_API/api/user/delete`
***POST Request***

- email
  <br/>

**Get every existing students**

#### `PATH_TO_API/api/user/getallstudents`
***GET Request***

- NO PARAMETERS
  <br/>

**Get student corresponding to email**

#### `PATH_TO_API/api/user/getstudentbyemail`
***GET Request***

- email
  <br/>

**Get every existing teachers**

#### `PATH_TO_API/api/user/getallteachers`
***GET Request***

- NO PARAMETERS
  <br/>

**Get teacher corresponding to email**

#### `PATH_TO_API/api/user/getteacherbyemail`
***GET Request***

- email
  <br/>

# Group queries

**Create a group**

#### `PATH_TO_API/api/group/create`
***POST Request***

- manager -> teacher_id
- students -> [student_id, ...]
  <br/>

**Get all groups**

#### `PATH_TO_API/api/group/getallgroups`
***GET Request***

- NO PARAMETERS
  <br/>

**Get group by group id**

#### `PATH_TO_API/api/group/getgroup`
***GET Request***

- groupId
  <br/>

**Add criteria to group**

> Requirements : no sprint started

#### `PATH_TO_API/api/group/addlabel`
***POST Request***

- groupId
- label -> String
  <br/>

**Remove criteria from group**

> Requirements : no sprint started

#### `PATH_TO_API/api/group/removelabel`
***POST Request***

- groupId
- label -> String
  <br/>

**Change every criteria from group**

> Requirements : no sprint started

#### `PATH_TO_API/api/group/removelabel`
***POST Request***

- groupId
- labels -> [String, ...]
  <br/>

**Add students to a group**

#### `PATH_TO_API/api/group/addstudents`
***POST Request***

- groupId
- students -> [student_id, ...]
  <br/>

**Remove students from a group**

#### `PATH_TO_API/api/group/removestudents`
***POST Request***

- groupId
- students -> [student_id, ...]
  <br/>

**Change group manager**

#### `PATH_TO_API/api/group/changemanager`
***POST Request***

- groupId
- managerId
  <br/>

# Sprint queries

**Create a sprint**

> Requirements : group must exist

#### `PATH_TO_API/api/sprint/create`
***POST Request***

- groupId
  <br/>

**Delete a sprint**

#### `PATH_TO_API/api/sprint/delete`
***POST Request***

- groupId
- sprintId
  <br/>

**Update sprint ratings**

> Requirements : labels must exist

#### `PATH_TO_API/api/sprint/updateratings`
***POST Request***

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

#### `PATH_TO_API/api/sprint/updatecomment`
***POST Request***

- sprintId
- comment

  <br/>
