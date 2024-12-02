import { faker} from "@faker-js/faker";
import { createHash } from "../utils/index.js";


class MockingService {

    static async generateMockingUsers(num) {
        const users = [];
        for (let i = 0; i < num; i++) {
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash("coder123"),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: []
            })
        }
        return users;
    };

    static async generateMockingPets(num) {
        const pets = [];

        for (let i = 0; i < num; i++) {
            pets.push({
                name: faker.animal.petName(),
                specie: faker.animal.type(),
                adopted: false,
                brithDate: faker.date.past(),
                image: 'https://via.placeholder.com/150'
            });
        }
        return pets;
    };



}

export default MockingService