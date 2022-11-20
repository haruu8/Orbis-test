/**
 * Orbis は Typescript に対応していないため jsx で書く
 */
import React, { useEffect, useState } from 'react'
import { Orbis } from "@orbisclub/orbis-sdk";
import CreatePostForm from './CreatePostForm';

const OrbisTest = () => {
  /** The user object */
	const [user, setUser] = useState();

  // useEffect(() => {
  //   // We recommend developers to also use the orbis.isConnected() on each app mount/load to check if there is an active session for the user visiting your app website.
  //   orbis.isConnected()

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  /** Initialize the Orbis class object */
  let orbis = new Orbis();

	/** Calls the Orbis SDK and handle the results */
  async function connect() {
    /** Example 1: Connecting without requiring Lit encryption */
    // provider: optional By default it will be using window.ethereum if available. Can be used to pass the WalletConnect provider for example.
    // lit: optional Use false if you are not using any features requiring encryption (such as token gated posts or direct messages). Default is true which is requiring two signatures for a full login.
    let res = await orbis.connect_v2({
      provider: window.ethereum,
    });

		/** Check if connection is successful or not */
		if(res.status == 200) {
      setUser(res.did);
      console.log(res)
		} else {
			console.log("Error connecting to Ceramic: ", res);
			alert("Error connecting to Ceramic.");
		}
  }

  /**
   * Disconnect the user from the Orbis SDK
   */
  const onLoggedOut = async () => {
    let res = await orbis.logout();
    setUser(null)
  }

	return(
		<div>
      {user ?
        <div>
          <p>Connected with: {user}</p>
          <button onClick={() => onLoggedOut()}>logout</button>
          <hr />
          <CreatePostForm />
        </div>
			:
				<button onClick={() => connect()}>Connect</button>
			}
		</div>
	)
}

export default OrbisTest
