import Mentee from "../Model/MenteeSchema.js";
import Mentor from "../Model/MentorSchema.js";

export const suggestMentors = async (req, res) => {
  try {
    const menteeId = req.params.id;

    // Fetch the mentee's interests
    const mentee = await Mentee.findById(menteeId);

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

    console.log("sorted Mentors : ", sortedMentors);
    res.status(200).json({
      success: true,
      message: "Mentee field of interest matched with mentor expertise",
      sortedMentors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error at Matching API",
    });
  }
};
