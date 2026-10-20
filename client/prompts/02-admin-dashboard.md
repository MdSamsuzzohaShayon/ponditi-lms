Following same theme (of home page that I have provided you), create an admin dashboard . 
Use bootstrap classes as much as possible for styling. 
Create proper static typing with type script. 
Make it very responsive for desktop, tablet, and mobile. 
THere will be 4 tabs, 
    1. Medium
    2. CLASS_TYPE
    3. SUBJECT
    4. Users
default will be class type. 

Indeed, I will create 4 pages with same layout of tabs. 
If I click on Medium, it will fetch all Medium items. Here is curl request for fetch all:

```
curl --location 'http://localhost:9000/api/tuitionm/all'
```

response:
```
{
    "tuitionms": []
}
```

Then we will have a delete button to delete a medium:

```
curl --location --request DELETE 'http://localhost:9000/api/tuitionm/delete/1'

```



ANd add tuition medium:

```
curl --location 'http://localhost:9000/api/tuitionm/add' \
--data '{
    "name": "English"
}'

```

Make proper Next.js code (app router) (latest version of next js)
Use axios to make those requests

Repeat all those steps for class types, subject, users