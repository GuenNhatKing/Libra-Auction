export async function CreateProduct(submitData: FormData) {
    for (const [key, value] of submitData.entries()) {
        console.log(key, value);
    }
    const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        credentials: "include",
        body: submitData,
    });

    // check success
    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        throw new Error("Request failed");
    }

    const text = await res.text();
    console.log("Raw response:", text);

    try {
        const json = JSON.parse(text);
        console.log("JSON response:", json);
    } catch {
        console.log("Response is not JSON");
    }

    // parse JSON
    const data = await res.json();
    console.log("Response data:", data);
    return data;
}