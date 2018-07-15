import React from 'react'
import { Navbar, Image } from 'react-bootstrap'
import { connectStaticBasedUrls } from 'resolve-redux'
import { Helmet } from 'react-helmet'

const StaticBasedImage = connectStaticBasedUrls(['src'])(Image)

const Header = ({ title, name, css, favicon }) => (
  <div>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href={favicon} type="image/png" />
      {css.map((href, index) => (
        <link rel="stylesheet" href={href} key={index} />
      ))}
      <title>{title}</title>
    </Helmet>

    <Navbar>
      <Navbar.Text>
        <StaticBasedImage src="/resolve-logo.png" /> {name}
      </Navbar.Text>

      <Navbar.Collapse>
        <Navbar.Text pullRight>
          <Navbar.Link href="https://facebook.com/resolvejs/">
            <StaticBasedImage src="/fb-logo.png" />
          </Navbar.Link>
        </Navbar.Text>

        <Navbar.Text pullRight>
          <Navbar.Link href="https://twitter.com/resolvejs">
            <StaticBasedImage src="/twitter-logo.png" />
          </Navbar.Link>
        </Navbar.Text>

        <Navbar.Text pullRight>
          <Navbar.Link href="https://github.com/reimagined/resolve">
            <StaticBasedImage src="/github-logo.png" />
          </Navbar.Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  </div>
)

export default connectStaticBasedUrls(['css', 'favicon'])(Header)