process.env.NODE_ENV = "test"
import assert = require("assert")
import * as sinon from "sinon"
import * as typeorm from "typeorm"
import { InsertResult } from "typeorm"

import * as CategoryService from "../../../src/service/Category"
import { Category } from "../../../src/entity/Category"

describe("categoryService", () => {
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it("should create a new category", async () => {
        const category = new Category()
        category.name = "Health"

        const insertResult = new InsertResult()
        insertResult.identifiers = [{ id: 1 }]

        const fakeManager = sandbox.createStubInstance(typeorm.EntityManager)
        fakeManager.insert.resolves(insertResult)

        sandbox.stub(typeorm, "getManager").returns(fakeManager as any)

        const savedCategory = new Category()
        savedCategory.id = 1
        savedCategory.name = "Health"

        const fakeRepository = sandbox.createStubInstance(typeorm.Repository)
        fakeRepository.findOne.resolves(savedCategory)

        sandbox.stub(typeorm, "getRepository").returns(fakeRepository as any)

        const createResult = await CategoryService.createCategory(category)
        assert(createResult.code === "200")
    })

    it("should return code 500 on insert error", async () => {
        const category = new Category()
        category.name = "Health"

        const insertResult = new InsertResult()
        insertResult.identifiers = [{ id: 1 }]

        const fakeManager = sandbox.createStubInstance(typeorm.EntityManager)
        fakeManager.insert.throws()

        sandbox.stub(typeorm, "getManager").returns(fakeManager as any)

        const createResult = await CategoryService.createCategory(category)
        assert(createResult.code === "500")
    })
})
