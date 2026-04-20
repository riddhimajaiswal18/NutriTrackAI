import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── User Profile ───────────────────────────────────────────

export const createUserProfile = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
};

export const updateUserProfile = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

// ─── Food Logs ──────────────────────────────────────────────

// ✅ Use Timestamp.now() (NOT serverTimestamp)
export const addFoodLog = async (uid, entry) => {
  const logsRef = collection(db, "users", uid, "foodLogs");

  const docRef = await addDoc(logsRef, {
    ...entry,
    timestamp: Timestamp.now(),
  });

  return docRef.id;
};

// ✅ Correct per-day query (timestamp range)
export const getFoodLogsByDate = async (uid, dateStr) => {
  const logsRef = collection(db, "users", uid, "foodLogs");

  const start = new Date(dateStr + "T00:00:00");
  const end = new Date(dateStr + "T23:59:59");

  const q = query(
    logsRef,
    where("timestamp", ">=", Timestamp.fromDate(start)),
    where("timestamp", "<=", Timestamp.fromDate(end)),
    orderBy("timestamp", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ✅ Weekly query (fixed)
export const getWeeklyFoodLogs = async (uid) => {
  const logsRef = collection(db, "users", uid, "foodLogs");

  const now = new Date();
  const last7Days = new Date();
  last7Days.setDate(now.getDate() - 7);

  const q = query(
    logsRef,
    where("timestamp", ">=", Timestamp.fromDate(last7Days)),
    orderBy("timestamp", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const updateFoodLog = async (uid, logId, data) => {
  const logRef = doc(db, "users", uid, "foodLogs", logId);
  await updateDoc(logRef, data);
};

export const deleteFoodLog = async (uid, logId) => {
  const logRef = doc(db, "users", uid, "foodLogs", logId);
  await deleteDoc(logRef);
};