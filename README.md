#Apiis `

##Admin
1. *register* - `http://localhost:8000/api/admin/register` *POST*
2. *login* - `http://localhost:8000/api/admin/login` *POST*
3. *verify person profile* - `http://localhost:8000/api/admin/log/verifyProfile` *PUT*
4. *get all founders profiles* - `http://localhost:8000/api/admin/log/getProfiles` *GET*
5. *get all founder profile* - `http://localhost:8000/api/admin/log/getProfile` *GET*

##General
1. *register persons* - `http://localhost:8000/api/general/register` *POST*
2. *login persons* - `http://localhost:8000/api/general/login` *POST*
3. *get all startups* - `http://localhost:8000/api/general/getStartups` *GET*
4. *get startup* - `http://localhost:8000/api/general/getStartup` *GET*

##Founder
1. *verify profile email* - `http://localhost:8000/api/founder/log/verify` *POST*
2. *change email status* - `http://localhost:8000/api/founder/log/changeEmailStatus` *PUT*
3. *change profile status* - `http://localhost:8000/api/founder/log/changeProfileStatus` *PUT*
4. *update favourite list* - `http://localhost:8000/api/founder/log/updateFavouriteList` *PUT*

##Investor
1. *verify profile email* - `http://localhost:8000/api/investor/log/verify` *POST*
2. *change email status* - `http://localhost:8000/api/investor/log/changeEmailStatus` *PUT*
3. *update favourite list* - `http://localhost:8000/api/investor/log/updateFavouriteList` *PUT*