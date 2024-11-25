// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import YouTubeIcon from "@mui/icons-material/YouTube";

// NUBA AUTO components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo-ct-dark.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "NUBA AUTO",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/NubaAuto",
    },
    {
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/nubaauto/",
    },
    // {
    //   icon: <GitHubIcon />,
    //   link: "https://www.tiktok.com/@nubaauto?lang=en",
    // },
    // {
    //   icon: <YouTubeIcon />,
    //   link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
    // },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "about us", href: "/aboutus" },
        // { name: "freebies", href: "https://www.creative-tim.com/templates/free" },
        // { name: "premium tools", href: "https://www.creative-tim.com/templates/premium" },
        // { name: "blog", href: "https://www.creative-tim.com/blog" },
      ],
    },
    {
      name: "resources",
      items: [
        { name: "tiktok", href:"https://www.tiktok.com/@nubaauto?lang=en" },
        { name: "facebook", href: "https://www.facebook.com/NubaAuto" },
        { name: "instagram", href: "https://www.instagram.com/nubaauto/" },
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "contactus" },
        // { name: "knowledge center", href: "https://www.creative-tim.com/knowledge-center" },
        // { name: "custom development", href: "https://services.creative-tim.com/" },
        // { name: "sponsorships", href: "https://www.creative-tim.com/sponsorships" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "/presentation" },
        // { name: "privacy policy", href: "https://www.creative-tim.com/privacy" },
        // { name: "licenses (EULA)", href: "https://www.creative-tim.com/license" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date}
      {/* <MKTypography
        component="a"
        href="https://www.creative-tim.com"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Creative Tim
      </MKTypography> */}
      .
    </MKTypography>
  ),
};
