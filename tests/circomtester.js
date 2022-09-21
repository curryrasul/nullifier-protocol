const { assert } = require("console");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const hash = require("circomlibjs").poseidon;
const { merkelize, getMerkleProof } = require("../js/merkleTree.js");
const F = require("circomlibjs").babyjub.F;

describe("Check Merkle tree Circuit", function () {
    let circuit;

    this.timeout(10000000);

    before(async() => {
        circuit = await wasm_tester(path.join(__dirname, "./", "../circuits/circuit.circom"));
    });

    it("Should check inclussion in MT", async () => {
        const m = merkelize(F, hash, [[11, 12], [22, 23], [33, 34], [44, 45], [55, 56], [66, 67], [77, 78], [88, 89]], 3);
        const root = m[0];
        const mp = getMerkleProof(m, 2, 3);

        const input = {
            key: F.e(2),
            secret: F.e(33),
            nullifier: F.e(34),
            root: root,
            siblings: mp
        };

        await circuit.calculateWitness(input, true);
    });
});