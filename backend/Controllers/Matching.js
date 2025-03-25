import Mentee from "../Model/MenteeSchema.js";
import Mentor from "../Model/MentorSchema.js";

export const suggestMentors = async (menteeId) => {
  // Fetch the mentee's interests
  const mentee = await Mentee.findById(menteeId);
  if (!mentee) return [];

  // Find mentors with matching expertise
  const mentors = await Mentor.find({
    expertise: { $in: mentee.fieldOfInterest },
  });

  // Sort mentors by number of matching skills
  const sortedMentors = mentors
    .map((mentor) => {
      const matchCount = mentor.expertise.filter((skill) =>
        mentee.fieldOfInterest.includes(skill)
      ).length;
      return { ...mentor._doc, matchCount };
    })
    .sort((a, b) => b.matchCount - a.matchCount);

  return sortedMentors;
};
