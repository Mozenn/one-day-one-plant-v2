import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const subalpineFir = await prisma.plant.upsert({
    where: { name: 'subalpine fir' },
    update: {},
    create: {
      name: 'subalpine fir',
      scientificName: 'abies lasiocarpa',
      family: 'pinaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Abies_lasiocarpa_26008.JPG/450px-Abies_lasiocarpa_26008.JPG',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Abies_lasiocarpa',
        },
      ],
    },
  });
  const sourCherry = await prisma.plant.upsert({
    where: { name: 'sour cherry' },
    update: {},
    create: {
      name: 'sour cherry',
      scientificName: 'prunus cerasus',
      family: 'rosaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg/1280px-Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Prunus_cerasus',
        },
        {
          source: 'INP',
          url: 'https://inpn.mnhn.fr/espece/cd_nom/116054',
        },
      ],
    },
  });
  const chineseWitchHazel = await prisma.plant.upsert({
    where: { name: 'chinese witch hazel' },
    update: {},
    create: {
      name: 'chinese witch hazel',
      scientificName: 'hamamelis mollis',
      family: 'hamamelidaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Hamamelis_mollis0.jpg/220px-Hamamelis_mollis0.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Hamamelis_mollis',
        },
      ],
    },
  });
  const asianPear = await prisma.plant.upsert({
    where: { name: 'asian pear' },
    update: {},
    create: {
      name: 'asian pear',
      scientificName: 'pyrus pyrifolia',
      family: 'rosaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Nashi_pear.jpg/800px-Nashi_pear.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Pyrus_pyrifolia',
        },
      ],
    },
  });
  const silverMapple = await prisma.plant.upsert({
    where: { name: 'silver maple' },
    update: {},
    create: {
      name: 'silver maple',
      scientificName: 'acer saccharinum',
      family: 'sapindaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Silber-Ahorn_%28Acer_saccharinum%29.jpg/220px-Silber-Ahorn_%28Acer_saccharinum%29.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Acer_saccharinum',
        },
      ],
    },
  });
  const cucumberTree = await prisma.plant.upsert({
    where: { name: 'cucumber tree' },
    update: {},
    create: {
      name: 'cucumber tree',
      scientificName: 'magnolia acuminata',
      family: 'magnoliaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Magnolia_acuminata.jpg/220px-Magnolia_acuminata.jpg',
      urls: [
        {
          label: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Magnolia_acuminata',
        },
      ],
    },
  });
  const koreanRhododendron = await prisma.plant.upsert({
    where: { name: 'korean rhododendron' },
    update: {},
    create: {
      name: 'korean rhododendron',
      scientificName: 'rhododendron mucronulatum',
      family: 'ericaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Korea-Jindallae-Rhododendron_mucronulatum-01.jpg/220px-Korea-Jindallae-Rhododendron_mucronulatum-01.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Rhododendron_mucronulatum',
        },
      ],
    },
  });
  const waterLettuce = await prisma.plant.upsert({
    where: { name: 'water lettuce' },
    update: {},
    create: {
      name: 'water lettuce',
      scientificName: 'pistia',
      family: 'araceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Pistia_stratiotes0.jpg/220px-Pistia_stratiotes0.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Pistia',
        },
      ],
    },
  });
  const sessileOak = await prisma.plant.upsert({
    where: { name: 'sessile oak' },
    update: {},
    create: {
      name: 'sessile oak',
      scientificName: 'quercus petraea',
      family: 'fagaceae',
      createdAt: new Date(),
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Quercus_petraea_06.jpg/220px-Quercus_petraea_06.jpg',
      urls: [
        {
          source: 'wikipedia',
          url: 'https://en.wikipedia.org/wiki/Quercus_petraea',
        },
      ],
    },
  });
  console.log({
    subalpineFir,
    sourCherry,
    chineseWitchHazel,
    asianPear,
    silverMapple,
    cucumberTree,
    koreanRhododendron,
    waterLettuce,
    sessileOak,
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'gauthier.cassany@gmail.com' },
    update: {},
    create: {
      username: 'user1',
      email: 'gauthier.cassany@gmail.com',
      score: 100,
      profilePlantUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Abies_lasiocarpa_26008.JPG/450px-Abies_lasiocarpa_26008.JPG',
      createdAt: new Date(),
      password: await hash('Password1*', 10),
      verified: true,
      lastDrawDate: new Date('2021-05-04 19:10:25'),
      lastDrawPlantId: 1,
      plants: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        create: [
          {
            name: 'test',
            scientificName: 'test',
            family: 'test',
            imageUrl: 'test',
            urls: '{}',
          },
        ],
      },
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: 'gauthierclapiers@hotmail.fr' },
    update: {},
    create: {
      username: 'user2',
      email: 'gauthierclapiers@hotmail.fr',
      score: 500,
      profilePlantUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Abies_lasiocarpa_26008.JPG/450px-Abies_lasiocarpa_26008.JPG',
      createdAt: new Date(),
      password: await hash('Password1*', 10),
      lastDrawDate: new Date('2021-05-04 19:10:25'),
      lastDrawPlantId: 2,
      plants: {
        connect: [{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }],
      },
    },
  });
  console.log({ user1, user2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
