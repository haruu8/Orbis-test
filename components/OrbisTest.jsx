/**
 * Orbis は Typescript に対応していないため jsx で書く
 */
import React, { useState } from 'react'
import { Orbis } from "@orbisclub/orbis-sdk";

const OrbisTest = () => {
  /** Initialize the Orbis class object */
  let orbis = new Orbis();

  /** The user object */
	const [user, setUser] = useState();

	/** Calls the Orbis SDK and handle the results */
	async function connect() {
    let res = await orbis.connect();

		/** Check if connection is successful or not */
		if(res.status == 200) {
      setUser(res.did);
      console.log(res)
		} else {
			console.log("Error connecting to Ceramic: ", res);
			alert("Error connecting to Ceramic.");
		}
	}

	return(
		<div>
			{user ?
				<p>Connected with: {user}</p>
			:
				<button onClick={() => connect()}>Connect</button>
			}
		</div>
	)
}

export default OrbisTest
