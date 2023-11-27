OLCF Frontier
=============

If this is your first time building MFIX-Exa on Joule2, please 
review the general notes below and `Basics`_ section first.

* To access Summit, you will need an
  `OLCF account <https://my.olcf.ornl.gov/account-application-new>`_
  and an RSA token. 
* The name of hte MFIX-Exa account is ``cfd122`` 
* These instructions build MFIX-Exa on the login nodes using ``-j8`` CPUs. 
  You may have to decrease this value if there is high traffic 
  or you may want to increase this value if you are on a compute 
  node interactively. 
* The instructions assume that you are compiling in a directory 
  inside of the ``mfix`` directory.
* For the dependencies, it is assumed that you have set the 
  following environment variables:

  .. code:: bash

     export HYPRE_INSTALL_DIR=$HOME/<path/to/my/hypre-install-dir>
     export CSG_INSTALL_DIR=$HOME/<path/to/my/csg-dep-install-dir>
     export ASCENT_INSTALL_DIR=$HOME/<path/to/my/ascent-install-dir>

  to a path that you have read/write access to. 
  You will need to recall these paths later if you want to build 
  MFIX-Exa with the optional dependencies.
* After building the ``mfix`` executable (with cmake), you can 
  build the PIC-to-DEM restarter app by executing the following command 
  in the ``build`` directory

  .. code:: bash

      cmake --build . --target pic2dem
*  These instructions have targeded the Cray Programming Environment. 
   The GNU PE _should_ also work, but it has not been tested. Please 
   see previous notes on Crusher TDS. 

.. warning::

   MFIX-Exa currently experiences a floating point exception 
   when running with ascent support. Make sure all of the 
   fpe traps in your inputs are off.   


Basics
------

Source code
~~~~~~~~~~~
   
Before building, first obtain a copy of the source code
following the instructions on the 
`MFIX-Exa website. <https://mfix.netl.doe.gov/products/mfix-exa/download/>`_

Modules
~~~~~~~

These build notes target the (default) ``PrgEnv-cray`` 
programming environment and the ``cmake`` build method.  


.. tabs:: 

   .. tab:: CPU 

      .. code:: bash 

         module purge
         module reset
         module load cmake/3.23.2
         module load cpe/22.12
         module load craype-accel-amd-gfx90a
         module load cray-mpich/8.1.23
         module load gmp/6.2.1
         module load boost/1.79.0
         
   .. tab:: GPU 

      .. code:: bash 

         module purge
         module reset
         module load cmake/3.23.2
         module load cpe/22.12
         module load craype-accel-amd-gfx90a
         module load rocm/5.4.3
         module load cray-mpich/8.1.23
         module load cce/15.0.0  # must reload after rocm
         module load gmp/6.2.1
         module load boost/1.79.0
         
         export MPICH_GPU_SUPPORT_ENABLED=1
         
         export CFLAGS="-I${ROCM_PATH}/include"
         export CXXFLAGS="-I${ROCM_PATH}/include"
         export LDFLAGS="-L${ROCM_PATH}/lib -lamdhip64"

Building MFIX-Exa
-----------------

The commands below are the superbuild instructions, i.e., 
AMReX is built as part of the MFIX-Exa build process. 
To build MFIX-Exa with hypre, csg and/or ascent dependencies, 
you first need to build and install these libraries and their dependencies.
Instructions on building the necessary dependencies are below 
and should be successfully installed first. These instructions are currently 
only provided for ``cmake``. 

.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         cmake -DCMAKE_BUILD_TYPE=Release \
               -DAMReX_TINY_PROFILE=no \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_GPU_BACKEND=NONE \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               ../
         make -j8

   .. tab:: GPU

      .. code:: bash

         export AMREX_AMD_ARCH=gfx90a

         cmake -DCMAKE_BUILD_TYPE=Release \
               -DAMReX_TINY_PROFILE=no \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_GPU_BACKEND=HIP \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               ../
         make -j8

   .. tab:: CPU-full

      .. code:: bash

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit

         export CSG_DIR=$CSG_INSTALL_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR
         
         export Boost_INCLUDE_DIR="-I$OLCF_BOOST_ROOT/include"

         cmake -DCMAKE_BUILD_TYPE=Release \
               -DAMReX_TINY_PROFILE=no \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_GPU_BACKEND=NONE \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               ../mfix
         make -j8

   .. tab:: GPU-full

      .. code:: bash
          
         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include
          
         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit
          
         export CSG_DIR=$CSG_INSTALL_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR
          
         export Boost_INCLUDE_DIR="-I$OLCF_BOOST_ROOT/include"
          
         export AMREX_AMD_ARCH=gfx90a

         cmake -DCMAKE_BUILD_TYPE=Release \
               -DAMReX_TINY_PROFILE=no \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=HIP \
               -DGPUS_PER_NODE=8 \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               ../mfix
         make -j8


Optional build dependencies
---------------------------

The following dependencies need to be built and installed 
prior to following any of the full build instructions above. 

#. HYPRE

   .. tabs::

      .. tab:: CPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR --with-MPI
            make -j8 install 
            popd

      .. tab:: GPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR \
                        --without-superlu \
                        --disable-bigint \
                        --without-openmp \
                        --enable-shared \
                        --with-hip \
                        --with-gpu-arch=gfx90a \
                        --enable-rocsparse \
                        --enable-rocrand \
                        --enable-unified-memory \
                        --enable-device-memory-pool \
                        --with-MPI-lib-dirs="${MPICH_DIR}/lib ${CRAY_MPICH_ROOTDIR}/gtl/lib ${ROCM_PATH}/lib" \
                        --with-MPI-libs="mpi mpi_gtl_hsa amdhip64" \
                        --with-MPI-include="${MPICH_DIR}/include {ROCM_PATH}/include"
            make -j8 install 
            popd


#. Catch2

   .. code:: bash

      git clone --depth 1 --branch v2.13.7 https://github.com/catchorg/Catch2
      pushd Catch2/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd


#. MPFR

   .. code:: bash

      wget https://www.mpfr.org/mpfr-current/mpfr-4.2.0.tar.gz
      tar -zxvf mpfr-4.2.0.tar.gz
      pushd mpfr-4.2.0/
      ./configure --prefix=$CSG_INSTALL_DIR \
                  --with-gmp-lib=${OLCF_GMP_ROOT}/lib \
                  --with-gmp-include=${OLCF_GMP_ROOT}/include
      make -j8 install
      popd


#. CGAL

   .. code:: bash

      git clone --depth 1 --branch v5.3 https://github.com/CGAL/cgal
      pushd cgal/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd


#. PEGTL

   .. code:: bash

      git clone --branch 3.2.2 https://github.com/taocpp/PEGTL
      pushd PEGTL/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd


#. Conduit

   .. code:: bash

      git clone --recursive https://github.com/LLNL/conduit.git
      pushd conduit/
      git checkout v0.8.6
      mkdir build && cd build
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DENABLE_OPENMP=OFF \
            -DENABLE_MPI=ON \
            -DENABLE_CUDA=OFF \
            -DENABLE_PYTHON=OFF \
            -DENABLE_GTEST=OFF \
            -DENABLE_TESTS=OFF
      make -j8 install
      popd


#. Vtk-m

   .. code:: bash

      git clone --branch master https://gitlab.kitware.com/vtk/vtk-m.git
      pushd vtk-m/
      git checkout v1.9.0
      mkdir build && cd build/
      cmake -S ../ -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DVTKm_ENABLE_OPENMP=OFF \
            -DVTKm_ENABLE_MPI=ON \
            -DVTKm_ENABLE_CUDA=OFF \
            -DVTKm_USE_64BIT_IDS=OFF \
            -DVTKm_USE_DOUBLE_PRECISION=ON \
            -DVTKm_USE_DEFAULT_TYPES_FOR_ASCENT=ON \
            -DVTKm_NO_DEPRECATED_VIRTUAL=ON \
            -DVTKm_ENABLE_TESTING=OFF
      make -j8 install
      popd


#. Ascent

   .. code:: bash

      git clone --recursive https://github.com/Alpine-DAV/ascent.git
      pushd ascent
      git checkout v0.9.0
      mkdir build && cd build/
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DCONDUIT_DIR=$ASCENT_INSTALL_DIR \
            -DVTKM_DIR=$ASCENT_INSTALL_DIR \
            -DENABLE_VTKH=ON \
            -DENABLE_FORTRAN=OFF \
            -DENABLE_PYTHON=OFF \
            -DENABLE_DOCS=OFF \
            -DBUILD_SHARED_LIBS=ON \
            -DENABLE_GTEST=OFF \
            -DENABLE_TESTS=OFF
      make -j8 install
      popd



Running Jobs
------------

Common Slurm commands:

* ``sinfo`` see available/allocated resources
* ``sbatch runit.sh`` submit a cpu job to the queue
* ``squeue -u USER`` check job status of user USER
* ``squeue -p PARTITION`` check job status of partition PARTITION
* ``scancel JOBID`` kill a job with id JOBID
* ``salloc -N 1 -q debug -A CFD122 -J build -t 01:00:00`` grab an interactive node for an hour

Example run scripts: 

.. warning::

   Even when running a CPU-only MFIX-Exa build, you **do** still have to 
   load ROCm to avoid a missing loading shared libraries: libamdhip64.so.5) 
   error. The ``FI_*`` flags seem to be unnecessary for CPU-only runs, 
   but this has not been extensively tested yet.  

.. code:: bash

   #!/bin/bash -l
          
   #SBATCH -A CFD122
   #SBATCH -J runxyz
   #SBATCH -o job_%x-%j.out
   #SBATCH -e job_%x-%j.err
   #SBATCH --threads-per-core=1
   #SBATCH -t 00:15:00
   #SBATCH -N 2
    
   nodes=2
   nrs=16
   omp=1
    
   module purge
   module reset
   module load cmake/3.23.2
   module load cpe/22.12
   module load craype-accel-amd-gfx90a
   module load rocm/5.4.3
   module load cray-mpich/8.1.23
   module load cce/15.0.0  # must be loaded after rocm
   module load gmp/6.2.1
   module load boost/1.79.0
    
   export OMP_NUM_THREADS=$omp
   export MPICH_GPU_SUPPORT_ENABLED=1  # remove for cpu only
   #export FI_MR_CACHE_MAX_COUNT=0      # libfabric disable caching
   export FI_MR_CACHE_MONITOR=memhooks
   export FI_CXI_RX_MATCH_MODE=software
   export FI_CXI_REQ_BUF_SIZE=12582912
   export FI_CXI_REQ_BUF_MIN_POSTED=6
   export FI_CXI_DEFAULT_CQ_SIZE=131072
    
   srun -N $nodes -n $nrs -c1 --ntasks-per-gpu=1 --gpu-bind=closest ./mfix inputs > screen.txt
    
   #cpu srun -N $nodes -n $nrs -c1 ./mfix inputs > screen.txt

