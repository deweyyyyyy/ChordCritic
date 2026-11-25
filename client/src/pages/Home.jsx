import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import { Link, Text } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { TfiHome } from "react-icons/tfi"
import { LuSearch } from "react-icons/lu"
import { FaUserFriends } from "react-icons/fa"
import '../App.css'

function Home({ user, onLogout }) {
   const navigate = useNavigate()
   const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div>
          <h1>Welcome to ChordCritic</h1>
          <p>
            Create an account with <code>Sign Up</code> or if you have an account <code>Log In</code> to get started!
          </p>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>If you're logged in, click on your username to customize your profile</h2>
          <p>You can also click on the icons at the bottom to go to search for tracks/albums, return home, or find friends! </p>
        </div>
        <div id="IconTabs">
            <IconButton aria-label="Search for tracks/albums" colorPalette="purple" onClick={() => navigate("/Search")}>
              <LuSearch />
            </IconButton>
            <IconButton aria-label="Homepage" colorPalette="purple" onClick={() => navigate("/")}>
              <TfiHome />
            </IconButton>
            <IconButton aria-label="Find Friends" colorPalette="purple" onClick={() => navigate("/friends")}>
              <FaUserFriends />
            </IconButton>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>

      <section id="signup">
        {user ? (
          <>
            <Text> Hi, {" "}
              <Link 
                variant = "underline"
                href="http://localhost:5173/profile"
                colorPalette="purple"
              >
                {user.username}
              </Link>{" "}
            </Text>
            <Avatar.Root>
              <Avatar.Fallback name = {user.username} />
              <Avatar.Image src = {user.avatarUrl} alt = {user.username} />
            </Avatar.Root>
            <button type="button" className="logout" onClick={() => { console.log("logout clicked", onLogout); onLogout?.(); }}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button type="button" className="signup" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
            <button type="button" className="login" onClick={() => navigate("/login")}>
              Log In
            </button>
          </>
        )}
      </section>
    </>
  )
}

export default Home