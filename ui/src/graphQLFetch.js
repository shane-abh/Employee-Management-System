export default async function graphQLFetch(query, variables = {}) {
    const response = await fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables
        }),
    });

    // Check and parse the JSON data
    const data = await response.json();

    // Throw an error if the response error
    if (data.errors) {
        throw new Error(data.errors[0].message);
    }

    return data.data;
};