import type { CreateSkillData, UpdateSkillData } from "./skills.validation";

import { Skill } from "./skills.model";

const getAllSkills = async () => {
  const skills = await Skill.find({});

  return skills;
};

const getSkillById = async (id: string) => {
  const skill = await Skill.findById(id);
  return skill;
};

const createSkill = async (data: CreateSkillData) => {
  const skill = await Skill.create(data);

  return skill;
};

const updateSkill = async (id: string, data: UpdateSkillData) => {
  const skill = await Skill.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return skill;
};

const deleteSkill = async (id: string) => {
  const skill = await Skill.findByIdAndDelete(id);

  return skill;
};
export default {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
