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
        viewBox="0 0 600 475"
        height={475}
        width={600}
        backgroundColor="#513947"
        foregroundColor="#6a4a6d">

        <rect x="0" y="20" rx="0" ry="0" width="600" height="400" />
        <circle cx="140" cy="120" r="50" />
      </ContentLoader>
    )
    case "eventoFeed": return (
      <ContentLoader
        speed={2}
        width={800}
        height={400}
        viewBox="0 0 800 400"
        backgroundColor="#513947"
        foregroundColor="#6a4a6d"
      >
        <rect x="3" y="3" rx="10" ry="10" width="50%" height="20vh" />
        <rect x="3" y="3" rx="200" ry="10" width="500" height="20vh" />
        <rect x="3" y="3" rx="400" ry="10" width="500" height="20vh" />
      </ContentLoader>
    )
  }
}

export default Skeleton;
