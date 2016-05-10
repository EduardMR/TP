package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Proyecto;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Proyecto entity.
 */
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {

    @Query("select proyecto from Proyecto proyecto where proyecto.usuCreador.login = ?#{principal.username}")
    List<Proyecto> findByUsuCreadorIsCurrentUser();

}
