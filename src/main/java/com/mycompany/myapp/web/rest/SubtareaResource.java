package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Subtarea;
import com.mycompany.myapp.repository.SubtareaRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Subtarea.
 */
@RestController
@RequestMapping("/api")
public class SubtareaResource {

    private final Logger log = LoggerFactory.getLogger(SubtareaResource.class);

    @Inject
    private SubtareaRepository subtareaRepository;

    /**
     * POST  /subtareas -> Create a new subtarea.
     */
    @RequestMapping(value = "/subtareas",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Subtarea> createSubtarea(@Valid @RequestBody Subtarea subtarea) throws URISyntaxException {
        log.debug("REST request to save Subtarea : {}", subtarea);
        if (subtarea.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("subtarea", "idexists", "A new subtarea cannot already have an ID")).body(null);
        }
        Subtarea result = subtareaRepository.save(subtarea);
        return ResponseEntity.created(new URI("/api/subtareas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("subtarea", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subtareas -> Updates an existing subtarea.
     */
    @RequestMapping(value = "/subtareas",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Subtarea> updateSubtarea(@Valid @RequestBody Subtarea subtarea) throws URISyntaxException {
        log.debug("REST request to update Subtarea : {}", subtarea);
        if (subtarea.getId() == null) {
            return createSubtarea(subtarea);
        }
        Subtarea result = subtareaRepository.save(subtarea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("subtarea", subtarea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subtareas -> get all the subtareas.
     */
    @RequestMapping(value = "/subtareas",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Subtarea>> getAllSubtareas(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Subtareas");
        Page<Subtarea> page = subtareaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/subtareas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /subtareas/:id -> get the "id" subtarea.
     */
    @RequestMapping(value = "/subtareas/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Subtarea> getSubtarea(@PathVariable Long id) {
        log.debug("REST request to get Subtarea : {}", id);
        Subtarea subtarea = subtareaRepository.findOne(id);
        return Optional.ofNullable(subtarea)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /subtareas/:id -> delete the "id" subtarea.
     */
    @RequestMapping(value = "/subtareas/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSubtarea(@PathVariable Long id) {
        log.debug("REST request to delete Subtarea : {}", id);
        subtareaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("subtarea", id.toString())).build();
    }
}
