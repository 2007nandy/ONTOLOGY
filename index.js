
const ontology = {
    employee: {
        terms: ["employee", "staff member", "worker", "personnel"],
        definition: "A person working for an organization.",
        category: "Human Resource",
        relationships: [
            "Employee works_for Organization",
            "Employee receives Salary",
            "Employee belongs_to Department"
        ]
    },

    salary: {
        terms: ["salary", "pay", "wages", "compensation"],
        definition: "Money paid to an employee for their work.",
        category: "Finance",
        relationships: [
            "Salary paid_to Employee",
            "Salary managed_by Finance",
            "Salary recorded_in Payroll"
        ]
    },

    customer: {
        terms: ["customer", "client", "buyer", "consumer"],
        definition: "A person or organization purchasing products.",
        category: "Sales",
        relationships: [
            "Customer purchases Product",
            "Customer places Order",
            "Order generates Invoice"
        ]
    },

    product: {
        terms: ["product", "item", "goods", "merchandise"],
        definition: "An item offered for sale.",
        category: "Sales",
        relationships: [
            "Product belongs_to Category",
            "Product has Price",
            "Product purchased_by Customer"
        ]
    },

    user: {
        terms: ["user", "account holder", "system user", "login account"],
        definition: "A person authorized to access a computer system.",
        category: "Information Technology",
        relationships: [
            "User accesses System",
            "User has Account",
            "Account has Permissions"
        ]
    },

    invoice: {
        terms: ["invoice", "bill", "payment statement"],
        definition: "A document requesting payment for goods or services.",
        category: "Finance",
        relationships: [
            "Invoice issued_to Customer",
            "Invoice contains Product",
            "Invoice records Payment"
        ]
    }
};

// Display Knowledge Base
function displayKnowledge() {
    let output = "";

    for (let key in ontology) {
        output += `
            <p><strong>${key.toUpperCase()}</strong></p>
            <p>Synonyms: ${ontology[key].terms.join(", ")}</p>
            <hr>
        `;
    }

    document.getElementById("knowledge").innerHTML = output;
}

// Resolve Department Terminology
function resolveTerm() {

    const department =
        document.getElementById("department").value;

    const term = document.getElementById("term")
        .value.trim().toLowerCase();

    if (!term) {
        alert("Please enter a terminology.");
        return;
    }

    let matchedConcept = null;
    let conceptData = null;

    // Search Ontology
    for (let key in ontology) {

        if (ontology[key].terms.includes(term)) {
            matchedConcept = key;
            conceptData = ontology[key];
            break;
        }
    }

    // Display result
    if (matchedConcept) {

        document.getElementById("mapping").innerHTML = `
            <p class="success">✔ Concept Successfully Identified</p>
            <p>Department: ${department}</p>
            <p>Entered Term: ${term}</p>
            <p>Standard Concept: <strong>${matchedConcept.toUpperCase()}</strong></p>
            <p>Definition: ${conceptData.definition}</p>
            <p>Ontology Category: ${conceptData.category}</p>
        `;

        document.getElementById("relationships").innerHTML =
            conceptData.relationships
                .map(item => "🔗 " + item)
                .join("<br>");

        document.getElementById("decision").innerHTML = `
            <p class="success">Terminology Standardized Successfully!</p>
            <p>The term "${term}" is mapped to
            the common concept "${matchedConcept}".</p>
            <p>All departments can use the same
            standardized concept.</p>
        `;

    } else {

        document.getElementById("mapping").innerHTML = `
            <p class="error">Concept Not Found</p>
            <p>Entered Term: ${term}</p>
            <p>Department: ${department}</p>
        `;

        document.getElementById("relationships").innerHTML =
            "No semantic relationships available.";

        document.getElementById("decision").innerHTML = `
            <p class="error">Manual Review Required</p>
            <p>The term is not available in the ontology.</p>
            <p>An expert must verify and add the
            correct concept and synonyms.</p>
        `;
    }
}

// Reset Application
function resetSystem() {

    document.getElementById("department").value = "HR";
    document.getElementById("term").value = "";

    document.getElementById("mapping").innerHTML =
        "Enter a term to view its standard concept.";

    document.getElementById("relationships").innerHTML =
        "Waiting for terminology analysis.";

    document.getElementById("decision").innerHTML =
        "No decision available.";
}

// Initial Knowledge Display
displayKnowledge();