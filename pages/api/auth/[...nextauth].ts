import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Credentials({
            name: "Custom Provider",
            authorize: async (credentials) => {
                const res = await fetch("https://nrna-backoffice-production.azurewebsites.net/api/Admin/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
}

export default (req, res) => NextAuth(req, res, options);