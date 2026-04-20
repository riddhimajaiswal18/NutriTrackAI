import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile as updateProfileService,
} from "../services/firestoreService";
import { calculateDailyTargets, calculateBMI, getBMICategory } from "../utils/nutritionCalc";

const UserProfileContext = createContext(null);

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error("useUserProfile must be used within UserProfileProvider");
  return context;
};

export const UserProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

   useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setProfileLoading(false);
        return;
      }
      try {
        setProfileLoading(true);
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

    const dailyTargets = useMemo(() => {
    if (!profile) return { calories: 2000, protein: 60, carbs: 250, fat: 55 };
    return calculateDailyTargets(profile);
  }, [profile]);

  const bmiData = useMemo(() => {
    if (!profile || !profile.weight || !profile.height) return null;
    const bmi = calculateBMI(profile.weight, profile.height);
    return { value: bmi, ...getBMICategory(bmi) };
  }, [profile]);

 
  const createProfile = useCallback(async (data) => {
    if (!user) return;
    await createUserProfile(user.uid, data);
    setProfile({ id: user.uid, ...data });
  }, [user]);
  
 
  const updateProfile = useCallback(async (data) => {
    if (!user) return;
    await updateProfileService(user.uid, data);
    setProfile((prev) => ({ ...prev, ...data }));
  }, [user]);

  const value = {
    profile,
    profileLoading,
    dailyTargets,
    bmiData,
    createProfile,
    updateProfile,
    hasProfile: !!profile,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContext;
