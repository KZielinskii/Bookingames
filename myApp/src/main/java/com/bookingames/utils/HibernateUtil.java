package com.bookingames.utils;

import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    private static final SessionFactory sessionFactory;

    static {
        try {
            Configuration configuration = new Configuration();
            configuration.configure();
            sessionFactory = configuration.buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static Session getSession() throws HibernateException {
        return sessionFactory.openSession();
    }

    public static void createTable() {
        Session session = getSession();
        Transaction tx = session.beginTransaction();

        try {
            String createTableQuery = "CREATE TABLE IF NOT EXISTS users ("
                    + "id SERIAL PRIMARY KEY,"
                    + "username VARCHAR(255) NOT NULL UNIQUE,"
                    + "password VARCHAR(255) NOT NULL,"
                    + "email VARCHAR(255) NOT NULL UNIQUE"
                    + ")";
            session.createSQLQuery(createTableQuery).executeUpdate();
            tx.commit();
        } catch (Exception ex) {
            tx.rollback();
            throw ex;
        } finally {
            session.close();
        }
    }
}

