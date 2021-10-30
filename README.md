# QualiteDev API

REST API using express and MongoDB

# Summary

- [Start project](#init)
- [Starting development](#dev)
- [Starting production](#prod)
- [List of queries](#queries)
  - [User queries](#userqueries)
  - [Group queries](#groupqueries)
  - [Sprint queries](#sprintqueries)

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

# User queries <a id="userqueries"/>

## **Create Student user**

#### `PATH_TO_API/api/user/createstudent`

> **_POST Request_**

- email
- name
- firstname
  <br/>

## **Create Teacher user**

#### `PATH_TO_API/api/user/createteacher`

> **_POST Request_**

- email
- name
- firstname
  <br/>

## **Delete a user**

#### `PATH_TO_API/api/user/delete`

> **_POST Request_**

- email
  <br/>

## **Get every existing students**

#### `PATH_TO_API/api/user/getallstudents`

> **_GET Request_**

- NO PARAMETERS
  <br/>

## **Get student corresponding to email**

#### `PATH_TO_API/api/user/getstudentbyemail`

> **_GET Request_**

- email
  <br/>

## **Get every existing teachers**

#### `PATH_TO_API/api/user/getallteachers`

> **_GET Request_**

- NO PARAMETERS
  <br/>

## **Get teacher corresponding to email**

#### `PATH_TO_API/api/user/getteacherbyemail`

> **_GET Request_**

- email
  <br/>

# Group queries <a id="groupqueries"/>

## **Create a group**

#### `PATH_TO_API/api/group/create`

> **_POST Request_**

- manager -> teacher_id
- students -> [student_id, ...]
  <br/>

## **Get all groups**

#### `PATH_TO_API/api/group/getallgroups`

> **_GET Request_**

- NO PARAMETERS
  <br/>

## **Get group by group id**

#### `PATH_TO_API/api/group/getgroup`

> **_GET Request_**

- groupId
  <br/>

## **Add criteria to group**

> Requirements : no sprint started

#### `PATH_TO_API/api/group/addlabel`

> **_POST Request_**

- groupId
- label -> String
  <br/>

## **Remove criteria from group**

> Requirements : no sprint started

#### `PATH_TO_API/api/group/removelabel`

> **_POST Request_**

- groupId
- label -> String
  <br/>

## **Change every criteria from group**

> Requirements : no sprint started

#### `PATH_TO_API/api/group/removelabel`

> **_POST Request_**

- groupId
- labels -> [String, ...]
  <br/>

## **Add students to a group**

#### `PATH_TO_API/api/group/addstudents`

> **_POST Request_**

- groupId
- students -> [student_id, ...]
  <br/>

## **Remove students from a group**

#### `PATH_TO_API/api/group/removestudents`

> **_POST Request_**

- groupId
- students -> [student_id, ...]
  <br/>

## **Change group manager**

#### `PATH_TO_API/api/group/changemanager`

> **_POST Request_**

- groupId
- managerId
  <br/>

# Sprint queries <a id="sprintqueries"/>

## **Create a sprint**

> Requirements : group must exist

#### `PATH_TO_API/api/sprint/create`

> **_POST Request_**

- groupId
  <br/>

## **Delete a sprint**

#### `PATH_TO_API/api/sprint/delete`

> **_POST Request_**

- groupId
- sprintId
  <br/>

## **Update sprint ratings**

> Requirements : labels must exist

#### `PATH_TO_API/api/sprint/updateratings`

> **_POST Request_**

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

## **Update sprint comment**

#### `PATH_TO_API/api/sprint/updatecomment`

> **_POST Request_**

- sprintId
- comment

  <br/>
