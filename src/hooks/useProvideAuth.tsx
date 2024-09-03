import { useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from 'firebase/auth'
import { auth, db } from '../configs/firebaseConfig'
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import type { UserType } from "../types/user";
import type { DiaryModelProps } from "../types/diary";


const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dataFetched, setDataFetched] = useState<boolean>(false)
  const [infoUser, setUserInfo] = useState<UserType | null>()
  const [loading, setLoading] = useState<boolean>(true)
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [error, setError] = useState<string>()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate('/home')
      } else {
        navigate('/')
      }
      setLoading(false)
    })
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Função assíncrona deve ser chamada dentro de useEffect
    const fetchUserDiaries = async () => {
      if (user && !dataFetched) {
        setDataFetched(true)
        try {
          await getUserInfo();
        } catch (error) {
          console.error('E rro ao buscar diários do usuário:', error);
        }
      }
    };

    fetchUserDiaries();
  }, [user]);

  useEffect(() => {
    if (location.pathname === '/diary' || location.pathname === '/') {
      setShowNavbar(false)
    } else {
      setShowNavbar(true)
    }
  }, [location.pathname])

  /**
   * Funcao para Criar um usuário
   */
  const createAccount = async (email: string, password: string, username: string) => {
    setLoading(true)
    // Cria o usuário no Firebase Authentication
    const userCredencial: UserCredential = await createUserWithEmailAndPassword(auth, email, password)

    try {
      // Obtém o usuário
      const user = userCredencial.user
      
      // Adiciona um documento no Firestore com o UID do usuário
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        uid: user.uid,
        email: user.email,
        pictureUrl: user.photoURL
      });

      // Atualiza o estado com o usuário criado
      setUser(user)
      setLoading(false)

    } catch (err) {
      console.error("Erro ao criar conta:", error);
    }
  }

  /**
   * Funçao para Logar o usuário
   */
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        setUser(userCredencial.user);
        navigate('/home')
        setLoading(false)
      }).catch((error) => {
        setLoading(false);
        throw error
      })
  }

  /**
   * Função para Deslogar o usuário
   */
  const logOut = async () => {
    signOut(auth).then(() => {
      navigate('/')
    })
  }

  /**
  * Função para obter diários do usuário
  */
  const getUserInfo = async (): Promise<void> => {
    if (!user?.uid) {
      console.error('User UID is not defined');
      return;
    }
    try {

      // Pegando as informações Básicas do usuário
      const docRef = doc(db, `users/${user.uid}`)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('DocSnap: =>', docSnap.data())
        setUserInfo(docSnap.data())
      } else {
        console.log("No such document!");
      }

      // ...
      const q = query(collection(db, `users/${user.uid}/diaries`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=> ", doc.data());
      });
    } catch (error: any) {
      setError('aqui' + error.message);
    }
  }

  /**
   * Função para enviar os dados do diário
   */
  const sendDiaryData = async (diaryData: DiaryModelProps): Promise<void> => {
    try {
      if (!user?.uid) {
        setError('Usuário não autenticado.');
        return;
      }
      // Referência para o documento onde os dados serão armazenados
      const diaryDocRef = doc(db, `users/${user.uid}/diaries/${diaryData.sleepDate}`);

      // Verifica se o diário já existe
      const diarySnap = await getDoc(diaryDocRef);

      if (diarySnap.exists()) {
        console.log('Já existe um diário com essa data!');
        setError('Já existe um diário com essa data! Por favor, escolha outra data.');
      } else {
        // Se o documento não existir, cria um novo
        await setDoc(diaryDocRef, diaryData);
        navigate('/home')
        console.log("Dados do diário enviados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar dados do diário: ", error);
      setError('Erro ao enviar os dados do diário. Por favor, tente novamente.');
    }
  };

  /**
 * Função para atualizar o username de um usuário no Firestore
 */
const updateUsernameInFirestore = async (uid: string, newUsername: string) => {
  try {
    // Referência ao documento do usuário no Firestore
    const userDocRef = doc(db, 'users', uid);

    // Atualiza o campo username no documento do Firestore
    await updateDoc(userDocRef, {
      username: newUsername
    });

    console.log("Username atualizado no Firestore com sucesso!");

  } catch (error) {
    console.error("Erro ao atualizar username no Firestore:", error);
  }
};


  return {
    user,
    infoUser,
    getUserInfo,
    sendDiaryData,
    loading,

    error,
    setError,

    signIn,
    createAccount,
    updateUsernameInFirestore,
    logOut,
    showNavbar,
    setShowNavbar,
  };
}

export default useProvideAuth;