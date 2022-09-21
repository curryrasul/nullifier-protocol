const chai = require("chai");
const assert = chai.assert;

const hash = require("circomlibjs").poseidon;
const { merkelize, getMerkleProof, isMerkleProofValid } = require("../js/merkleTree.js");

const F = require("circomlibjs").babyjub.F;

describe("Merkle tree test", function () {
    it("It should create a 3 level merkle tree, generate a mp and validate it", async () => {
        const m = merkelize(F, hash, [[11, 12], [22, 23], [33, 34], [44, 45], [55, 56], [66, 67], [77, 78], [88, 89]], 3);
        const root = m[0];
        const mp = getMerkleProof(m, 2, 3);

        assert(isMerkleProofValid(F, hash, 2, 33, 34, root, mp));
    });
});