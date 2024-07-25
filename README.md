
# 🔎 osu! Username Finder

<p align="center">
🔎 Script that (ab)use the osu! endpoints to find an username and get more details about its availability and such more (remaining time to claim it, etc...) !
![hi lol](https://github.com/Maous-B/osu-UsernameFinder/blob/master/pictures/Already%20in%20use%20or%20not%20available.PNG?raw=true)
</p>


# ❓ Why this project ? 

Firstly, I was intersted with the [Amnezzia's ign Finder](https://github.com/amnezziaa/ignFinder). However, the project was very limited because it only checks if the status code of the ``HTTP GET`` request is ``OK (202) (username can't be claimable)`` or ``NOT FOUND (404) (username can be claimable)`` and doesn't give more details because an username's user can be claimable if the profile is inactive and yet it returns a 202 response. Then, I was thinking about the game osu! and how can I 

# 📝 How it works
I was curious on how osu! check if a username is available or not and I went to [the osu! username change webpage](https://osu.ppy.sh/store/products/username-change) and I started intercepting requests. I've found that they do a POST request to ``https://osu.ppy.sh/users/check-username-availability`` with the parameter ``username`` when I enter an username. The thing I did is I copied the whole request and added my ``OSU_SESSION`` and ``XRSF_TOKEN`` cookies values to imitate the

the JSON response format for the username mrekk : 

``
{
  username: 'mrekk',
  available: false,
  message: 'Username is already in use!',
  cost: 0,
  costString: 'free!'
}
``

# 🛠️ Installation

1. Clone the repository

```bash
  git clone https://github.com/Maous-B/osu-UsernameFinder.git
  cd osu-UsernameFinder
```
    
2. Install the dependancies

```bash
  npm install
```
    
3. Add the XRSF_TOKEN and the OSU_SESSION cookies value inside of the ``.env`` file

To find the cookies values, please refer to the guide on how to find your cookies sessions [here](https://google.com)

```bash
  XSRF_TOKEN="xsrf_token cookie value here !"
  OSU_SESSION="osu_session cookie value here !"
```

# 📖 Usage 

To run the script, type ``node app.js <username to check>`` or ``npm run start`` inside of the root project
