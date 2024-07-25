
# 🔎 osu! Username Finder
<p align="center">
🔎 Script that (ab)use the osu! endpoints to find an username and get more details about its availability and such more (remaining time to claim it, etc...)

<img src="https://raw.githubusercontent.com/Maous-B/osu-UsernameFinder/master/pictures/Available.PNG" alt="Example">
</p>


# ❓ Why this project ? 

Firstly, I was intersted with the [Amnezzia's ign Finder](https://github.com/amnezziaa/ignFinder). However, the project was very limited because it only checks if the status code of the ``HTTP GET`` request is ``OK (202) (username can't be claimable)`` or ``NOT FOUND (404) (username can be claimable)`` and doesn't give more details because an username's user can be claimable if the profile is inactive and yet it returns a 202 response. Then, I was thinking about the game osu! and how can I get more details about an username and its availibility

# 📝 How it works
I was curious on how osu! check if a username is available or not and I went to [the osu! username change webpage](https://osu.ppy.sh/store/products/username-change) and I started intercepting requests. I've found that they do a POST request to ``https://osu.ppy.sh/users/check-username-availability`` with the parameter ``username`` when I enter an username. The thing I did is I copied the whole request and added my ``OSU_SESSION`` and ``XRSF_TOKEN`` cookies values to imitate it.

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

To find the cookies values, please refer to the guide on how to find your cookies sessions [here](https://github.com/Maous-B/osu-UsernameFinder/blob/master/README.md#-how-can-i-find-my-cookies-values-xrsf_token--osu_session)

```bash
  XSRF_TOKEN="xsrf_token cookie value here !"
  OSU_SESSION="osu_session cookie value here !"
```

# ❓ How can I find my cookies values (XRSF_TOKEN / OSU_SESSION)

<p align="center">
When logged in and authentificated with a valid osu! account in the website, press F12 > Application > Cookies and copy and paste your XRSF_TOKEN and OSU_SESSION cookies values inside of the ``.env`` file to make it work
<img src="https://github.com/Maous-B/osu-UsernameFinder/blob/master/pictures/Chrome%20WebDev%20Tools.png?raw=true" alt="Tutorial on how to find cookies sessions">
</p>

# 📖 Usage 

To run the script, type ``node app.js <username to check>`` or ``npm run start <username to check`` inside of the root project
