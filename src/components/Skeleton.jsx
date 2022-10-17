import React from "react"
import ContentLoader from "react-content-loader";

function Skeleton({ type }) {
  switch (type) {
    case "evento": return (
      <ContentLoader
        viewBox="0 0 400 120"
        height={120}
        width={400}
        backgroundColor="#d1d1d1"
        foregroundColor="#bababa"
      >

        <rect x="110" y="8" rx="3" ry="3" width="150" height="15" />
        <rect x="110" y="40" rx="3" ry="3" width="410" height="9" />
        <rect x="110" y="56" rx="3" ry="3" width="410" height="9" />
        <rect x="110" y="72" rx="3" ry="3" width="380" height="9" />
        <rect x="110" y="110" rx="3" ry="3" width="178" height="9" />
        <circle cx="50" cy="60" r="50" />

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
