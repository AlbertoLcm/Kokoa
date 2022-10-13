import React from "react"
import ContentLoader from "react-content-loader";

function Skeleton({ type }) {
  switch (type) {
    case "evento": return (
      <ContentLoader
        viewBox="0 0 400 160"
        height={160}
        width={400}
        backgroundColor="#d1d1d1"
        foregroundColor="#bababa"
      >
        <rect x="0" y="13" rx="4" ry="4" width="400" height="9" />
        <rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
        <rect x="0" y="50" rx="4" ry="4" width="400" height="10" />
        <rect x="0" y="65" rx="4" ry="4" width="400" height="10" />
        <rect x="0" y="79" rx="4" ry="4" width="100" height="10" />
        <rect x="0" y="99" rx="5" ry="5" width="400" height="200" />
      </ContentLoader>
    )
    case "perfilFeed": return (
      <ContentLoader
        viewBox="0 0 400 475"
        height={475}
        width={400}
        backgroundColor="#513947"
        foregroundColor="#6a4a6d">

        <circle cx="15" cy="30" r="13" />

        <rect x="35" y="25" rx="4" ry="4" width="60" height="5" />
        <rect x="0" y="50" rx="5" ry="5" width="100" height="470" />
      </ContentLoader>
    )
    case "eventoFeed": return (
      <ContentLoader
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#513947"
        foregroundColor="#6a4a6d"
      >
        <rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
        <rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
        <rect x="50" y="55" rx="4" ry="4" width="343" height="38" />
        <rect x="8" y="55" rx="4" ry="4" width="35" height="38" />
        <rect x="50" y="104" rx="4" ry="4" width="343" height="38" />
        <rect x="8" y="104" rx="4" ry="4" width="35" height="38" />
      </ContentLoader>
    )
  }
}

export default Skeleton;
