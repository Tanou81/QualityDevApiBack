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

<strong>Create Student user</strong>

#### `PATH_TO_API/api/user/createstudent`

- email
- name
- firstname
  <br/>

<strong>Create Teacher user</strong>

#### `PATH_TO_API/api/user/createteacher`

- email
- name
- firstname
  <br/>

<strong>Delete a user</strong>

#### `PATH_TO_API/api/user/delete`

- email
  <br/>

<strong>Get every existing students</strong>

#### `PATH_TO_API/api/user/getallstudents`

- <font color="#d44">NO PARAMETERS</font>
  <br/>

<strong>Get student corresponding to email</strong>

#### `PATH_TO_API/api/user/getstudentbyemail`

- email
  <br/>

<strong>Get every existing teachers</strong>

#### `PATH_TO_API/api/user/getallteachers`

- <font color="#d44">NO PARAMETERS</font>
  <br/>

<strong>Get teacher corresponding to email</strong>

#### `PATH_TO_API/api/user/getteacherbyemail`

- email
  <br/>

### Group queries

<strong>Create a group</strong>

#### `PATH_TO_API/api/group/create`

- manager -> teacher_id
- students -> [student_id, ...]
  <br/>

<strong>Get all groups</strong>

#### `PATH_TO_API/api/group/getallgroups`

- <font color="#d44">NO PARAMETERS</font>
  <br/>

<strong>Get group by group id</strong>

#### `PATH_TO_API/api/group/getgroup`

- groupId
  <br/>

<strong>Add criteria to group</strong>

<font color="#d44">Requirements : no sprint started</font>

#### `PATH_TO_API/api/group/addlabel`

- groupId
- label -> String
  <br/>

<strong>Remove criteria from group</strong>

<font color="#d44">Requirements : no sprint started</font>

#### `PATH_TO_API/api/group/removelabel`

- groupId
- label -> String
  <br/>

### Group queries

<strong>Create a sprint</strong>

<font color="#d44">Requirements : group must exist</font>

#### `PATH_TO_API/api/srpint/create`

- groupId
  <br/>

<strong>Delete a sprint</strong>

#### `PATH_TO_API/api/srpint/delete`

- groupId
- sprintId
  <br/>

<strong>Update sprint ratings</strong>

![#df4f4f](Requirements : labels must exist)

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

<strong>Update sprint comment</strong>


#### `PATH_TO_API/api/srpint/updatecomment`

- sprintId
- comment

  <br/>
