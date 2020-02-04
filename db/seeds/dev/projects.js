const projectsStartData = require('../../../projects-start-data');

const createProject = async (knex, project) => {
  const projectId = await knex('projects').insert({
    name: project.name,
    current: project.current,
  }, 'id');

  let palettesPromises = project.palettes.map(palette => {
    return createPalette(knex, {
      name: palette.name,
      color1: palette.color1,
      color2: palette.color2,
      color3: palette.color3,
      color4: palette.color4,
      color5: palette.color5,
      project_id: projectId[0]
    })
  })

  return Promise.all(palettesPromises)
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
}

exports.seed = async (knex) => {
  try {
    await knex('palettes').del()
    await knex('projects').del()

    let projectPromises = projectsStartData.map(project => {
      return createProject(knex, project)
    })

    return Promise.all(projectPromises);
  } catch(error) {
    console.log(`Error seeding data ${error}`)
  }
}
