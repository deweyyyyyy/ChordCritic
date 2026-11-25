import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import { Link, Text } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
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
          <p>You can also click on the icons at the bottom to go to search for tracks/albums or find friends! </p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
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